import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper } from '@mui/material';
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


const RationCardDetails = () => {

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
        rationCard: [{
            name: '',
            cardNo: '',
            authority: '',
            issueDate: '',
            renewalDue: '',
        }]
    }

    const validationSchema = Yup.object({
        rationCard: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            cardNo: Yup.string().required('Mandatory Field!').matches(regex.bankAccountNo, 'Invalid Input'),
            authority: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            renewalDue: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))
    });

    
    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addrationcard",
        values,
        // {
        //     headers:{"Access-Control-Allow-Origin": "*"}
        // }
    ).then((response) => {
        console.log("success", response);
        // toast.success('Your Registration Successfully Done! ',{
        //     position: toast.POSITION.TOP_CENTER,
        // });       
        // setError(response);
    }, (error) => {
        console.log("error :", error);
        // setError(error.data);
        // toast.error('Something Went Wrong! Try Again Sometime!', {
        //     position:toast.POSITION.TOP_CENTER})
    }
    )

        const data = JSON.stringify(values);
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Ration Card Details</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Ration Card Details</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='rationCard'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { rationCard } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {rationCard.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`rationCard-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Card-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`rationCard[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Ration Card No.' name={`rationCard[${index}].cardNo`} placeholder='Submit Card Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Authority' name={`rationCard[${index}].authority`} placeholder='Submit Issuing Authority' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date' name={`rationCard[${index}].issueDate`} placeholder='Submit Issue Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Renewal Date' name={`rationCard[${index}].renewalDue`} placeholder='Submit Renewal Due On' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.rationCard[0])}>Add More</Button>



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

export default RationCardDetails
