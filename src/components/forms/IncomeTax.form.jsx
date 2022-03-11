import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import '../new-user/newuser.css';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';


const IncomeTax = () => {

    const [userRegister, setUserRegister] = useState({})

    // const dropDownOption=[{
    //     relation:[{
    //         val: 'father',
    //         key: 'Father',
    //       },
    //       {
    //         val: 'mother',
    //         key: 'Mother',
    //       },
    //       {
    //         val: 'sister',
    //         key: 'Sister',
    //       },
    //       {
    //         val: 'daughter',
    //         key: 'Daughter',
    //       },
    //       {
    //         val: 'son',
    //         key: 'Son',
    //       },
    //       {
    //         val: 'brother',
    //         key: 'brother',
    //       },
    //       {
    //         val: 'other',
    //         key: 'Other',
    //       },],
    // }]

    const initialValues = {
        incomeTax: [{
            assessmentYear: '',
            grossIncome: '',
            lastReturnFiled: '',
            assessmentDone: '',
            refundAmountDue: '',
        }]
    }

    const validationSchema = Yup.object({
        incomeTax: Yup.array(Yup.object({
            assessmentYear: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            grossIncome: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            lastReturnFiled: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            assessmentDone: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            refundAmountDue: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
        }))         
    });

    const onSubmit = async (values, onSubmitProps) => {
        const data = JSON.stringify(values);
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Income Tax Details</Typography>


                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Income Tax</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='incomeTax'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { incomeTax } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {incomeTax.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`incomeTax-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Tax-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' type='text' label='Assessment Year' name={`incomeTax[${index}].assessmentYear`} placeholder='Submit Assessment Year' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Total Gross Income' name={`incomeTax[${index}].grossIncome`} placeholder='Submit Total Gross Income' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Last Return Filed' name={`incomeTax[${index}].lastReturnFiled`} placeholder='Submit Last Return Filed' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Assessment Done' name={`incomeTax[${index}].assessmentDone`} placeholder='Submit Assessment Done, If Any' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Refund Amount Due' name={`incomeTax[${index}].refundAmountDue`} placeholder='Submit Refund Amount Due, If Any' />
                                                                    </Grid>

                                                                    {
                                                                        array.length > 1 &&
                                                                        <Grid item xs={12} sm={12} md={4}>

                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => remove(index)}>Remove</Button>

                                                                        </Grid>
                                                                    }
                                                                </Grid>
                                                            </fieldset>

                                                        </div>
                                                    ))}

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.incomeTax[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
                                {/* </fieldset> */}
                            </Form>
                        }
                        }
                    </Formik>
                </Paper>
            </div>
        </div>

    )
}

export default IncomeTax
