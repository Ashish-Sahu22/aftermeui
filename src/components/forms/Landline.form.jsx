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


const LandlineDetails = () => {

    const [userRegister, setUserRegister] = useState({})

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
        landline: [{
            name: '',
            houseDetails: '',
            phoneNo: '',
            customerId: '',
            depositLlWifiAmt: '',
        }]
    }

    const validationSchema = Yup.object({
        landline: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            houseDetails: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            phoneNo: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
            accountNo: Yup.string().required('Mandatory Field!').min(4, 'Invalid Input!'),
            depositLlWifiAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
        }))    
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Land Line Details</Typography>

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
                                    <FieldArray name='landline'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { landline } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {landline.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`agency-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Land Line-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Name' name={`landline[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='House Detail' name={`landline[${index}].houseDetails`} placeholder='Submit House Details' />
                                                                    </Grid>
                                                                    
                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Select Meter' name={`landline[${index}].meter`} placeholder='Submit Document Name' options={dropDownOption[0].meter} />
                                                                    </Grid> */}

                                                                    
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Phone No.' name={`landline[${index}].phoneNo`} placeholder='Submit Phone Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Customer Id/Account No' name={`landline[${index}].accountNo`} placeholder='Submit Customer Id/Account Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Deposit Amount Rs.' name={`landline[${index}].depositLlWifiAmt`} placeholder='Submit Deposit LL, BroadBand, Wifi Amount ' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.landline[0])}>Add More</Button>



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

export default LandlineDetails
