import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
// import { CalendarToday, Publish, CalendarTodayRounded, CalendarViewDay, CalendarViewDayRounded, LocationSearching, MailOutlined, PermIdentity, PhoneAndroid, Sync, TonalitySharp } from '@material-ui/icons';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import './newuser.css';
import axios from 'axios';
import Box from '@mui/material/Box';

// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function NewUser() {

    useEffect(() => {
        document.title = "Registration";
    }, [])

    const [userRegister, setUserRegister] = useState({})

    const initialValues = {
        userName: '',
        userDob: '',
        userTob: '',
        userPob: '',
        userAnniversary: '',
        userMobNumber: '',
        userEmail: '',
        userBloodGroup: '',
        userEmergency: '',
        userOrganization: '',
        userQualification: '',
        spouse: {
            spouseName: '',
            spouseDob: '',
            spouseTob: '',
            spousePob: '',
            spouseAnniversary: '',
            spouseMobNumber: '',
            spouseEmail: '',
            spouseBloodGroup: '',
            spouseEmergency: '',
            spouseOrganization: '',
            spouseQualification: '',
        },
        childs: [{
            name: '',
            dob: '',
            tob: '',
            pob: '',
            anniversary: '',
            mobNumber: '',
            email: '',
            bloodGroup: '',
            emergency: '',
            organization: '',
            qualification: '',
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
        await axios.post("http://a011-2405-201-401c-11a0-5c9-9804-e2c9-df50.ngrok.io/afterme/api/addSelf",
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                // toast.success('Your Registration Successfully Done! ',{
                //     position: toast.POSITION.TOP_CENTER,
                // });             
            }, (error) => {
                console.log("error :", error);
                // toast.error('Something Went Wrong! Try Again Sometime!', {
                //     position:toast.POSITION.TOP_CENTER})
            }
        )

        const data = JSON.stringify(values);
        console.log(data);
        console.log(values.userName);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>My Family Should Know</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>
                                {/* 
                            <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'> Me and My family Details </Typography></legend> */}

                                <div className='formInputs'>

                                    <fieldset>
                                        <legend> Me</legend>
                                        <div className='formInput'>
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Name' name='userName' placeholder='Submit Name' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Date Of Birth' name='userDob' placeholder='Submit Dob' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Time Of Birth' name='userTob' placeholder='Submit Time of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' label='Place Of Birth' name='userPob' placeholder='Submit Place of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Anniversary' name='userAnniversary' placeholder='Submit Anniversary' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Mobile Number' name='userMobNumber' placeholder='Submit Mobile Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='email' label='Email Id' name='userEmail' placeholder='Submit Email Id' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Blood Group' name='userBloodGroup' placeholder='Submit Blood Group' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Emergency Contact' name='userEmergency' placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Organization Details' name='userOrganization' placeholder='Please Enter Organization Details with Contact Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Qualifications' name='userQualification' placeholder='Please Enter Educational Qualifications' />
                                                </Grid>
                                                {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                                {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}
                                            </Grid>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>My Spouse</legend>
                                        <div className='formInput'>
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} >
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Name' name='spouse.spouseName' placeholder='Submit Name' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Date Of Birth' name='spouse.spouseDob' placeholder='Submit Dob' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Time Of Birth' name='spouse.spouseTob' placeholder='Submit Time of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' label='Place Of Birth' name='spouse.spousePob' placeholder='Submit Place of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Anniversary' name='spouse.spouseAnniversary' placeholder='Submit Anniversary' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Mobile Number' name='spouse.spouseMobNumber' placeholder='Submit Mobile Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='email' label='Email Id' name='spouse.spouseEmail' placeholder='Submit Email Id' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Blood Group' name='spouse.spouseBloodGroup' placeholder='Submit Blood Group' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Emergency Contact' name='spouse.spouseEmergency' placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Organization Details' name='spouse.spouseOrganization' placeholder='Please Enter Organization Details with Contact Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Qualifications' name='spouse.spouseQualification' placeholder='Please Enter Educational Qualifications' />
                                                </Grid>
                                            </Grid>
                                            {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                            {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Child</legend>
                                        <FieldArray name='childs'>
                                            {(ArrayHelpers) => (
                                                <div>
                                                    {formik.values.childs.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`childs-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Child-${index + 1}`}</legend>
                                                                <div className='formInput'>
                                                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Name' name={`childs.[${index}].name`} placeholder='Submit Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Date Of Birth' name={`childs.[${index}].dob`} placeholder='Submit Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Time Of Birth' name={`childs.[${index}].tob`} placeholder='Submit Time of Birth' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' label='Place Of Birth' name={`childs.[${index}].pob`} placeholder='Submit Place of Birth' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Anniversary' name={`childs.[${index}].anniversary`} placeholder='Submit Anniversary' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Mobile Number' name={`childs.[${index}].mobNumber`} placeholder='Submit Mobile Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='email' label='Email Id' name={`childs.[${index}].email`} placeholder='Submit Email Id' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Blood Group' name={`childs.[${index}].bloodGroup`} placeholder='Submit Blood Group' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Emergency Details' name={`childs.[${index}].emergency`} placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Organization Details' name={`childs.[${index}].organization`} placeholder='Please Enter Organization Details with Contact Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Qualifications' name={`childs.[${index}].qualification`} placeholder='Please Enter Educational Qualifications' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={3}>
                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    ))}
                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.childs[0])}>Add Child</Button>

                                                    {/* <FormikControl control='input' type='text' label='Name' name='userName' placeholder='Submit Name' />
                                    <FormikControl control='input' type='text' label='Date Of Birth' name='userDob' placeholder='Submit Dob' />
                                    <FormikControl control='input' type='text' label='Time Of Birth' name='userTob' placeholder='Submit Time of Birth' />
                                    <FormikControl control='input' type='text' label='Place Of Birth' name='userPob' placeholder='Place of Birth' />
                                    <FormikControl control='input' type='text' label='Anniversary' name='userAnniversary' placeholder='Submit Anniversary' />
                                    <FormikControl control='input' type='text' label='Mobile Number' name='userMobile' placeholder='Submit Mobile Number' />
                                    <FormikControl control='input' type='email' label='Email Id' name='userEmail' placeholder='Submit Email Id' />
                                    <FormikControl control='input' type='text' label='Blood Group' name='userBloodGroup' placeholder='Submit Blood Group' />
                                    <FormikControl control='textarea' label='Emergency Contact Details' name='userEmergency' placeholder='Emergency Contact Details' />
                                    <FormikControl control='textarea' label='Organization Contact Details' name='userOrganization' placeholder='Organization Contact Details' />
                                    <FormikControl control='textarea' label='Educational Qualifications' name='qualification' placeholder='Educational Qualification' />     */}

                                                    {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                                    {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}


                                                </div>
                                            )}
                                        </FieldArray>
                                    </fieldset>
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

export default NewUser