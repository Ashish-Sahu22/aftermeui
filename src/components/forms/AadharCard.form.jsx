import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
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


const AadharCard = () => {

    const [userRegister, setUserRegister] = useState({})
    const checkboxOption = [{
        attorneyExecutedFor: [{
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
        aadharCard: [{
            name: '',
            aadharNo: '',
            issueDate: '',
            phoneNo: '',
        }]
    }

    const validationSchema = Yup.object({
        aadharCard: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            aadharNo: Yup.string().required('Mandatory Field!').matches(regex.adhaar, 'Invalid Number!'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            phoneNo: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addaadharcard",
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
        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Aadhar Card</Typography>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Aadhar Cards</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='aadharCard'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { aadharCard } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {aadharCard.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`aadharCard-${index}`}>
                                                            <fieldset>
                                                                <legend>{`UID-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`aadharCard[${index}].name`} placeholder='Submit Card Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Aadhar Number' name={`aadharCard[${index}].aadharNo`} placeholder='Submit Aadhar Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date ' name={`aadharCard[${index}].issueDate`} placeholder='Submit Issue Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Phone Number' name={`aadharCard[${index}].phoneNo`} placeholder='Submit Linked Phone Number' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.aadharCard[0])}>Add More</Button>



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

export default AadharCard
