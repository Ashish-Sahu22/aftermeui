import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
// import { CalendarToday, Publish, CalendarTodayRounded, CalendarViewDay, CalendarViewDayRounded, LocationSearching, MailOutlined, PermIdentity, PhoneAndroid, Sync, TonalitySharp } from '@material-ui/icons';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link, Outlet, useNavigate } from 'react-router-dom'
import '../new-user/newuser.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import { margin } from '@mui/system';

// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function UserRegistration() {

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Registration";
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            navigate('/')
        }
    }, [])



    // const onSubmit = async (values, onSubmitProps) => {

    // };


    const [userRegister, setUserRegister] = useState({})

    const initialValues = {
        userName: '',
        firstName: '',
        lastName: '',
        // email: '',
        phoneNumber: '',
        password: '',
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('User Name is Mandatory Field!').min(5, 'Invalid User Name!'),
        firstName: Yup.string().required('First Name is Mandatory Field!').min(3, 'Invalid First Name!'),
        lastName: Yup.string().required('Last Name is Mandatory Field!').min(3, 'Invalid Last Name!'),
        // email: Yup.string().matches(regex.email, 'Invalid Email!').required('Email is Mandatory Field!').min(3, 'Invalid Email!'),
        phoneNumber: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        password: Yup.string().required('Please Submit your Password!').min(8, 'Invalid Password! Submit Valid Password'),
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/adduser", 
        values,
        // {
        //     headers:{"Access-Control-Allow-Origin": "*"}
        // }
        ).then(
            (response) => {
                console.log("success", response.data);
                // toast.success('Your Registration Successfully Done! ',{
                //     position: toast.POSITION.TOP_CENTER,
                // });  
                navigate('/login')           
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
            <Paper elevation={6} style={{ padding: 40, margin: "40px 250px" }}>
                <Typography color='primary' variant='h4' sx={{ textAlign: 'center', marginBottom: '20px' }}>Registration</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                <div className='formInputs'>
                                    {/* <fieldset>
                                        <legend>Me</legend> */}
                                    <div className='formInput'>
                                    <Paper variant="outlined" style={{ padding: 40, margin: '10px', width: '100%' }}>
                                        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                            <Grid item xs={12}>
                                                <FormikControl control='input' type='text' label='User Name' name='userName' placeholder='Create User Name' />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikControl control='input' type='text' label='First Name' name='firstName' placeholder='Submit First Name' />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikControl control='input' type='text' label='Last Name' name='lastName' placeholder='Submit Last Name' />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormikControl control='input' type='text' label='Mobile Number' name='phoneNumber' placeholder='Submit Mobile Number' />
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                <FormikControl control='email' type='email' label='Email Id' name='email' placeholder='Submit Email Id' />
                                            </Grid> */}
                                            <Grid item xs={12}>
                                                <FormikControl control='password' type='text' label='Password' name='password' placeholder='Submit Password' />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button type='submit' variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
                                            </Grid>
                                            <Grid item xs={12}>
                                                    <Link to="/login">
                                                    <Button variant='contained' color='primary' disabled={formik.isSubmitting}>Login</Button>
                                                    </Link>
                                                </Grid>
                                            {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                            {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}
                                        </Grid>
                                        </Paper>
                                    </div>
                                    {/* </fieldset> */}
                                </div>

                            </Form>
                        }
                        }
                    </Formik>
                </Paper>
            </div>

        </div>
    )
}

export default UserRegistration