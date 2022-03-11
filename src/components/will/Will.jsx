import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
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
import { margin } from '@mui/system';
import { Checkbox } from 'formik-mui';
import { TextField } from 'formik-mui';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import '../../controller/formik/DateSelect.css'
import { DatePicker, DateTimePicker, TimePicker } from 'formik-mui-lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';



// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function Will() {

    useEffect(() => {
        document.title = "Registration";
    }, [])

    const checkboxOption = [{
        attorneyExecutedFor: [
            {
                val: 'son',
                key: 'Son',
            },
            {
                val: 'spouse',
                key: 'Spouse',
            },
            {
                val: 'other',
                key: 'Other',
            }
        ],
    }]


    // const onSubmit = async (values, onSubmitProps) => {

    // };


    const [userRegister, setUserRegister] = useState({})

    const initialValues = {
        will: {
            executedOn: '',
            keptAt: '',
        },
        attorney: {
            executedFor: [],
            poa: '',
            deedExecutedOn: '',
            detailsFile: '',
        }
    }

    const validationSchema = Yup.object({
        will: Yup.object({
            executedOn: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            keptAt: Yup.string().required('Mandatory Field!').min(3, 'Mandatory Field!'),
        }),
        attorney: Yup.object({
            executedFor: Yup.array().min(1, 'Select an option!'),
            poa: Yup.string().required('Mandatory Field!').min(3, 'Mandatory Field!'),
            deedExecutedOn: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            detailsFile: Yup.string().required('Mandatory Field!').min(3, 'Mandatory Field!'),
        }),
    });

    const onSubmit = async (values, onSubmitProps) => {
        // await axios.get("http://fc12-103-105-96-121.ngrok.io/CrudOpr/registerProcess", 
        // values,
        // // {
        // //     headers:{"Access-Control-Allow-Origin": "*"}
        // // }
        // ).then(
        //     (response) => {
        //         console.log("success", response);
        //         // toast.success('Your Registration Successfully Done! ',{
        //         //     position: toast.POSITION.TOP_CENTER,
        //         // });             
        //     }, (error) => {
        //         console.log("error :", error);
        //         // toast.error('Something Went Wrong! Try Again Sometime!', {
        //         //     position:toast.POSITION.TOP_CENTER})
        //     }
        // )
        const data = JSON.stringify(values);
        console.log(data);
        console.log(values.userName);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 40 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>WILL / POA</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                    <div className='formInputs'>

                                        <div className='formInput'>
                                            <Paper variant='outlined' style={{ padding: 30, marginBottom: 30, width: '100%' }}>
                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                    <Grid item xs={12}>
                                                        <Typography color='primary' variant='h4' sx={{}}>Will</Typography>
                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={4}>
                                                            <label htmlFor='will.executedOn'><Typography variant='h6' sx={{}}>My Will is Executed On : </Typography></label>
                                                        </Grid>
                                                        <Grid item xs={8} sx={{ alignItems: 'center' }} className='datewidth'>
                                                            <Field
                                                                fullWidth
                                                                component={DatePicker}
                                                                variant="standard"
                                                                name='will.executedOn'
                                                                type="date"
                                                                textField={{ variant: 'standard' }}
                                                            // placeholder='My Will Is Executed On'
                                                            />
                                                        </Grid>
                                                        {/* <Field
                                                        component={CheckboxWithLabel}
                                                        type="checkbox"
                                                        name="checked"
                                                        Label={{ label: 'Checkbox' }}
                                                    />; */}
                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={4}>
                                                            <label htmlFor='will.keptAt'><Typography variant='h6' sx={{}}>Copy of the Will is Kept At : </Typography></label>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Field
                                                                fullWidth
                                                                component={TextField}
                                                                variant="standard"
                                                                type="text"
                                                                name='will.keptAt'
                                                            // placeholder='Submit Copy of the Will is Kept At'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <Paper variant='outlined' style={{ padding: 30, marginBottom: 30, width: '100%' }}>
                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                    <Grid item xs={12}>
                                                        <Typography color='primary' variant='h4' sx={{}}>Power Of Attorney</Typography>
                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={12} sx={{ alignItems: 'center', display: 'flex' }}>
                                                            <label htmlFor='attorney.executedFor'><Typography variant='h6' sx={{}}>Power Of Attorney executed for</Typography></label>
                                                            <FormikControl control='checkbox' name='attorney.executedFor' options={checkboxOption[0].attorneyExecutedFor} />
                                                        </Grid>

                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={4}>
                                                            <label htmlFor='attorney.poa'><Typography variant='h6' sx={{}}>My Power Of Attorney is</Typography></label>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Field
                                                                fullWidth
                                                                component={TextField}
                                                                variant="standard"
                                                                type="text"
                                                                name='attorney.poa'

                                                            // placeholder='Submit Copy of the Will is Kept At'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={4}>
                                                            <label htmlFor='attorney.deedExecutedOn'><Typography variant='h6' sx={{}}>Deed Executed on</Typography></label>
                                                        </Grid>
                                                        <Grid item xs={8} className='datewidth'>
                                                            <Field
                                                                fullWidth
                                                                component={DatePicker}
                                                                variant="standard"
                                                                type="date"
                                                                name='attorney.deedExecutedOn'
                                                                textField={{ variant: 'standard' }}
                                                            // placeholder='Submit Copy of the Will is Kept At'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container item xs={12} sx={{ alignItems: 'center' }}>
                                                        <Grid item xs={4}>
                                                            <label htmlFor='attorney.detailsFile'><Typography variant='h6' sx={{}}>Details kept in File No</Typography></label>
                                                        </Grid>
                                                        <Grid item xs={8}>
                                                            <Field
                                                                fullWidth
                                                                component={TextField}
                                                                variant="standard"
                                                                type="text"
                                                                name='attorney.detailsFile'
                                                            // placeholder='Submit Copy of the Will is Kept At'
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                <Grid item xs={12}>
                                                    <Button type='submit' variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </div>
                                </LocalizationProvider>
                            </Form>
                        }
                        }
                    </Formik>
                </Paper>
            </div>

        </div>
    )
}

export default Will