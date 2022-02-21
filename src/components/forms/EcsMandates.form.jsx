import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper } from '@mui/material';
// import { CalendarToday, Publish, CalendarTodayRounded, CalendarViewDay, CalendarViewDayRounded, LocationSearching, MailOutlined, PermIdentity, PhoneAndroid, Sync, TonalitySharp } from '@material-ui/icons';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import '../new-user/newuser.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import { margin, padding } from '@mui/system';

// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function EcsMandates() {

    useEffect(() => {
        document.title = "Registration";
    }, [])

    const [userRegister, setUserRegister] = useState({})

    const initialValues = {
        ecs: [{
            ecsFavour: '',
            amtPeriodicity: '',
            debitAccDetails: {
                bankBranch: '',
                accountNo: '',
            },
            startDate: '',
            endDate: '',
        }],
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
        console.log(values);
        console.log(data);
        console.log(values.userName);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>ECS Mandates Tables</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                    <legend className='headingLegend'> <Typography variant='h5' color='primary'>ECS Mandates</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='ecs'>
                                        {(ArrayHelpers) => (
                                            <div style={{ marginBottom: "2rem" }}>
                                                {formik.values.ecs.map((arrData, index, array) => (
                                                    <div className='childsInputs' key={`ecs-${index}`}>
                                                        <fieldset>
                                                            <legend>{`ECS-${index + 1}`}</legend>

                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center', marginBottom: '20px' }}>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='ECS Favouring' name={`ecs[${index}].ecsFavour`} placeholder='Submit Ecs Favouring' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Amount Periodicity' name={`ecs[${index}].amtPeriodicity`} placeholder='Submit Amount(Rs) Periodicity' />
                                                                </Grid>
                                                            </Grid>
                                                            <fieldset style={{ marginBottom: '24px', padding: '16px' }}>
                                                                <legend>{"Debit Account Details"}</legend>
                                                                <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} xs={12}>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control='input' type='text' label='Bank & Branch' name={`ecs[${index}].debitAccDetails.bankBranch`} placeholder='Submit Bank & Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control="input" type='text' label='Account No.' name={`ecs[${index}].debitAccDetails.accountNo`} placeholder='Submit Bank Account No.' />
                                                                    </Grid>
                                                                </Grid>
                                                            </fieldset>
                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='date' label='ECS Start Date' name={`ecs[${index}].startDate`} placeholder='Submit ECS Start Date' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='date' label='ECS End Date' name={`ecs[${index}].endDate`} placeholder='Submit ECS End Date' />
                                                                </Grid>
                                                                {
                                                                    array.length > 1 &&
                                                                    <Grid item xs={12} sm={12} md={6}>

                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>

                                                                    </Grid>
                                                                }
                                                            </Grid>
                                                        </fieldset>

                                                    </div>
                                                ))}

                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.ecs[0])}>Add More</Button>



                                            </div>
                                        )}
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

export default EcsMandates