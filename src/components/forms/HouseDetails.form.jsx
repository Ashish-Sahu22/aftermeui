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


const HouseDetails = () => {

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
        houseDetails: [{
            name: '',
            detail: '',
            howAcquired: '',
            loanAmt: '',
            installment: '',
            registrationNo: '',
            shareCertificate: '',
            propertyCardNo: '',

            houseTax: {
                houseTaxPayable: '',
                censusNo: '',
                propertyIdentificationNo: '',
                constructionArea: '',
                dueDate: ''
            },
            houseInsuranceProp: {
                insuranceCompany: '',
                sumInsured: '',
                premiumAmount: '',
                policyRenewalDate: '',
                riskCovered: ''
            },
            houseInsuranceLifeOfBorrower: {
                insuranceCompany: '',
                sumInsured: '',
                premiumAmount: '',
                policyRenewalDate: '',
                riskCovered: ''
            },

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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>House Property Details</Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => {
                        return <Form>
                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>House Properties</Typography></legend> */}

                                <div className='formInput'>
                                    <FieldArray name='houseDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { houseDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {houseDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`houseDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`House-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} style={{ marginBottom: '24px'}}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`houseDetails[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Property Detail' name={`houseDetails[${index}].detail`} placeholder='Submit Property Detail' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='How acquired' name={`houseDetails[${index}].howAcquired`} placeholder='How acquired (Inherited/Loan)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Loan Amount' name={`houseDetails[${index}].loanAmt`} placeholder='Submit Loan Amount Rs.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Installment' name={`houseDetails[${index}].installment`} placeholder='Submit Installment Rs.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Registration Number' name={`houseDetails[${index}].registrationNo`} placeholder='Submit Registration Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Share Certificate' name={`houseDetails[${index}].shareCertificate`} placeholder='Submit Share Certificate' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Property Card Number' name={`houseDetails[${index}].propertyCardNo`} placeholder='Submit Property Card Number' />
                                                                    </Grid>
                                                                    </Grid>

                                                                    <fieldset style={{ marginBottom: '24px' }} >
                                                                        <legend>{"House Tax Details"}</legend>
                                                                        <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='House Tax Payable' name={`houseDetails[${index}].houseTax.houseTaxPayable`} placeholder='Submit House Tax Payable Rs.' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Census Number' name={`houseDetails[${index}].houseTax.censusNo`} placeholder='Submit Census Number' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Property Identification Number' name={`houseDetails[${index}].houseTax.propertyIdentificationNo`} placeholder='Submit Property Identification Number' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Construction Area' name={`houseDetails[${index}].houseTax.constructionArea`} placeholder='Submit Construction Area, Sq. Meters' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='date' label='House Tax Due Date' name={`houseDetails[${index}].houseTax.dueDate`} placeholder='Submit Due Date Of House Tax' />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </fieldset>

                                                                    <fieldset style={{ marginBottom: '24px'}}>
                                                                        <legend>{"House Insurance (Property)"}</legend>
                                                                        <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Insurance Company' name={`houseDetails[${index}].houseInsuranceProp.insuranceCompany`} placeholder='Submit Insurance Company' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Sum Insured' name={`houseDetails[${index}].houseInsuranceProp.sumInsured`} placeholder='Submit Sum Insured' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Premium Amount' name={`houseDetails[${index}].houseInsuranceProp.premiumAmount`} placeholder='Submit Premium Amount' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='date' label='Policy Renewal Date' name={`houseDetails[${index}].houseInsuranceProp.policyRenewalDate`} placeholder='Submit Policy Renewal Date' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Risk Covered' name={`houseDetails[${index}].houseInsuranceProp.riskCovered`} placeholder='Submit Risk Covered' />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </fieldset>

                                                                    <fieldset style={{ marginBottom: '24px'}}>
                                                                        <legend>{"House Insurance (Life Of Borrower)"}</legend>
                                                                        <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Insurance Company' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.insuranceCompany`} placeholder='Submit Insurance Company' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Sum Insured' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.sumInsured`} placeholder='Submit Sum Insured' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Premium Amount' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.premiumAmount`} placeholder='Submit Premium Amount' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='date' label='Policy Renewal Date' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.policyRenewalDate`} placeholder='Submit Policy Renewal Date' />
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Risk Covered' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.riskCovered`} placeholder='Submit Risk Covered' />
                                                                            </Grid>
                                                                        </Grid>
                                                                    </fieldset>
                                                                    <Grid>
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.houseDetails[0])}>Add More</Button>



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

export default HouseDetails
