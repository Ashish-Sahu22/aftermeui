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


const MutualfundDetails = () => {

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
        mutualfundDetails: [{
            company: '',
            folioNo: '',
            lumpSumSip: '',
            fundName: '',
            amount: '',
            bankAccountDetails: '',
        }]
    }

    const validationSchema = Yup.object({
        // userName: Yup.string().required('User Name is Mandatory Field!').min(5, 'Invalid User Name!'),
        // firstName: Yup.string().required('First Name is Mandatory Field!').min(3, 'Invalid First Name!'),
        // lastName: Yup.string().required('Last Name is Mandatory Field!').min(3, 'Invalid Last Name!'),
        // email: Yup.string().matches(regex.email, 'Invalid Email!').required('Email is Mandatory Field!').min(3, 'Invalid Email!'),
        // mobile: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        // dob: Yup.date().required('Submit your Date of Birth!'),
        // address: Yup.string().required('Please Submit your Address!').min(20, 'Invalid Address! Submit your Complete Address'),
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Mutual Fund Details SIPs</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                    <legend className='headingLegend'> <Typography variant='h5' color='primary'>Mutual Funds</Typography></legend> */}

                                    <div className='formInputs'>

                                        <FieldArray name='mutualfundDetails'>
                                            {ArrayHelpers => {
                                                const { push, remove, form } = ArrayHelpers;
                                                const { values } = form;
                                                const { mutualfundDetails } = values;
                                                return (
                                                    <div style={{ marginBottom: "2rem" }}>
                                                        {mutualfundDetails.map((childData, index, array) => (
                                                            <div className='childsInputs' key={`mutualfund-${index}`}>
                                                                <fieldset>
                                                                    <legend>{`Mutual Fund-${index + 1}`}</legend>
                                                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Company' name={`mutualfundDetails[${index}].company`} placeholder='Submit Company' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Folio Number' name={`mutualfundDetails[${index}].folioNo`} placeholder='Submit Folio Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control="input" type='text' label='Lump Sum/SIP' name={`mutualfundDetails[${index}].lumpSumSip`} placeholder='Submit Lump Sum / SIPs' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Fund Name' name={`mutualfundDetails[${index}].fundName`} placeholder='Fund Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Amount' name={`mutualfundDetails[${index}].amount`} placeholder='Submit Amount (Rs)' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='textarea' label='Bank Account' name={`mutualfundDetails[${index}].bankAccountDetails`} placeholder='Submit Attached Bank Account Details' />
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

                                                        <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.mutualfundDetails[0])}>Add More</Button>



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

export default MutualfundDetails