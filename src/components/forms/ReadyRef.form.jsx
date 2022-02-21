import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Grid, IconButton, Paper, Typography } from '@mui/material';
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

const ReadyRef = () => {

    const [userRegister, setUserRegister] = useState({})

    const dropDownOption = [{
        reference: [{
            val: 'familyDoctor',
            key: 'Family Doctor',
        },
        {
            val: 'specialistDoc',
            key: 'Specialist Doctor',
        },
        {
            val: 'hospital',
            key: 'Hospital',
        },
        {
            val: 'taxConsultant',
            key: 'Tax Consultant',
        },
        {
            val: 'insuranceAgent',
            key: 'Insurance Agent',
        },
        {
            val: 'stock Brocker',
            key: 'Stock Brocker',
        },
        {
            val: 'other',
            key: 'Other',
        }],
    }]

    const initialValues = {
        readyRef: [{
            reference: '',
            name: '',
            contactNo: '',
            office: '',
            residence: '',
        }]
    }

    const validationSchema = Yup.object({
        readyRef: Yup.array(Yup.object({
            // reference: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            // name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            // contactNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            // office: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            // residence: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
        }))
        // firstName: Yup.string().required('First Name is Mandatory Field!').min(3, 'Invalid First Name!'),
        // lastName: Yup.string().required('Last Name is Mandatory Field!').min(3, 'Invalid Last Name!'),
        // email: Yup.string().matches(regex.email, 'Invalid Email!').required('Email is Mandatory Field!').min(3, 'Invalid Email!'),
        // mobile: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        // dob: Yup.date().required('Submit your Date of Birth!'),
        // address: Yup.string().required('Please Submit your Address!').min(20, 'Invalid Address! Submit your Complete Address'),
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://b9b7-2405-201-401c-11a0-583d-f43c-45a3-e181.ngrok.io/afterme/api/addReference1", 
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
        console.log(values);
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Ready Reference</Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => {
                        return <Form>
{/* 
                            <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>References</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='readyRef'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { readyRef } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {readyRef.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`readyRef-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Reference-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Reference' name={`readyRef[${index}].reference`} placeholder='Submit Reference' options={dropDownOption[0].reference} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`readyRef[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Contact Number' name={`readyRef[${index}].contactNo`} placeholder='Submit Contact Number' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' type='text' label='Office Address' name={`readyRef[${index}].office`} placeholder='Submit Office Address' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Residence Address' name={`readyRef[${index}].residence`} placeholder='Submit Residence Address' />
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

                                                    <Button
                                                        variant='contained'
                                                        color='primary'
                                                        style={{ minWidth: '90px', textAlign: 'center' }}
                                                        onClick={() => push(initialValues.readyRef[0])}>
                                                        Add More
                                                    </Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button
                                    type='submit'
                                    style={{ textAlign: 'center', margin: '8px 0px' }}
                                    variant='contained'
                                    color='primary'
                                    startIcon={formik.isSubmitting ? <CircularProgress size='1rem' /> : undefined}
                                    disabled={!formik.isValid || formik.isSubmitting}>
                                    {formik.isSubmitting ? 'Submitting' : 'Submit'}
                                </Button>
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

export default ReadyRef
