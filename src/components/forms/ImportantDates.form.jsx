import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper } from '@mui/material';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex, months } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import '../new-user/newuser.css';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';


const ImportantDates = () => {

    const [userRegister, setUserRegister] = useState({})
    const [monthData, setMonthData] = useState({ months });


    const dropDownOption = [{
        meter: [{
            val: 'electric meter',
            key: 'Electric Meter',
        },
        {
            val: 'water meter',
            key: 'Water Meter',
        },
        ],
    }]

    const initialValues = {
        eventdates: [{
            name: '',
            date: '',
            event: '',
        }]
    }

    const validationSchema = Yup.object({
        // docName: Yup.string().required('User Name is Mandatory Field!').min(5, 'Invalid User Name!'),
        // firstName: Yup.string().required('First Name is Mandatory Field!').min(3, 'Invalid First Name!'),
        // lastName: Yup.string().required('Last Name is Mandatory Field!').min(3, 'Invalid Last Name!'),
        // email: Yup.string().matches(regex.email, 'Invalid Email!').required('Email is Mandatory Field!').min(3, 'Invalid Email!'),
        // mobile: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        // dob: Yup.date().required('Submit your Date of Birth!'),
        // address: Yup.string().required('Please Submit your Address!').min(20, 'Invalid Address! Submit your Complete Address'),
    });



    const onSubmit = async (values, onSubmitProps) => {

        await axios.post("http://localhost:8080/afterme/api/adddrivingLicence",
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

                <Typography color='primary' sx={{ textAlign: 'center' }} variant='h4'>Important Dates</Typography>
                {
                    months.map((monthData, monthindex, montharray) => (
                        <div key={monthindex}>
                            <Paper elevation={6} style={{ padding: 40, margin: '40px 10px 0px 10px' }}>
                                <Typography color='primary' variant='h5'>{monthData}</Typography>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {formik => {
                                        return <Form>

                                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Land Line Details</Typography></legend> */}

                                            <div className='formInputs'>
                                                <FieldArray name='eventdates'>
                                                    {ArrayHelpers => {
                                                        const { push, remove, form } = ArrayHelpers;
                                                        const { values } = form;
                                                        const { eventdates } = values;
                                                        return (
                                                            <div style={{ marginBottom: "2rem" }}>
                                                                {eventdates.map((dataItem, index, array) => (
                                                                    <div className='childsInputs' key={`${monthData}-${index}`}>
                                                                        <Paper variant="outlined" style={{ padding: 20, margin: '10px 0px 20px 0px' }}>
                                                                            {/* <fieldset>
                                                                        <legend>{`${monthData}-${index + 1}`}</legend> */}
                                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='textarea' label='House Detail' name={`eventdates[${index}].houseDetails`} placeholder='Submit House Details' />
                                                                            </Grid> */}

                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Select Meter' name={`eventdates[${index}].meter`} placeholder='Submit Document Name' options={dropDownOption[0].meter} />
                                                                    </Grid> */}


                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='date' label='Date' name={`eventdates[${index}].date`} placeholder='Select Date' />
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='input' label='Events' name={`eventdates[${index}].event`} placeholder='Submit Events(Birthday/Anniversary/Others' />
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='input' label='Name' name={`eventdates[${index}].name`} placeholder='Submit Name' />
                                                                                </Grid>
                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Deposit Amount Rs.' name={`eventdates[${index}].depositLlWifiAmt`} placeholder='Submit Deposit LL, BroadBand, Wifi Amount ' />
                                                                            </Grid> */}

                                                                                {
                                                                                    array.length > 1 &&
                                                                                    <Grid item xs={12} sm={12} md={4}>
                                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => remove(index)}>Remove</Button>

                                                                                    </Grid>
                                                                                }
                                                                            </Grid>
                                                                            {/* </fieldset> */}
                                                                        </Paper>
                                                                    </div>
                                                                ))}

                                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.eventdates[0])}>Add More</Button>

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
                    ))}
            </div>
        </div>

    )
}

export default ImportantDates
