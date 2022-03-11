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


const LoanDetails = () => {

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
        loanDetails: [{
            loanType: '',
            bankBranch: '',
            accountNo: '',
            borrowers: '',
            loanAmt: '',
            advDate: '',
        }]
    }

    const validationSchema = Yup.object({
        loanDetails: Yup.array(Yup.object({
            loanType: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            accountNo: Yup.string().required('Mandatory Field!').matches(regex.bankAccountNo, 'Invalid Input'),
            borrowers: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            loanAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            advDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))    
    });

    const onSubmit = async (values, onSubmitProps) => {
        const data = JSON.stringify(values);
        console.log(data);
        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Loan Details</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>loanDetails Policies</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='loanDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { loanDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {loanDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`loanDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Loan-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Type of Loan' name={`loanDetails[${index}].loanType`} placeholder='Submit Type of Loan' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Bank & Branch' name={`loanDetails[${index}].bankBranch`} placeholder='Submit Bank & Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control="input" type='text' label='Account No.' name={`loanDetails[${index}].accountNo`} placeholder='Submit Bank Account No.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Borrowers' name={`loanDetails[${index}].borrowers`} placeholder='Submit Name of Borrowers' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Loan Amount' name={`loanDetails[${index}].loanAmt`} placeholder='Submit Amount of Loan (Rs)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Date of Advance' name={`loanDetails[${index}].advDate`} placeholder='Submit Date of Advance' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.loanDetails[0])}>Add More</Button>



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

export default LoanDetails
