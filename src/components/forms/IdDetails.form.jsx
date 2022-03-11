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

const IdDetails = () => {

    const [userRegister, setUserRegister] = useState({})

    const dropDownOption = [{
        documentType: [{
            val: 'passport',
            key: 'Passport',
        },
        {
            val: 'drivinglic',
            key: 'Driving Licence',
        },
        {
            val: 'vehicleRc',
            key: 'Vehicle RC',
        },
        {
            val: 'panCard',
            key: 'PAN Card',
        },
        {
            val: 'adharCard',
            key: 'Adhar Card',
        },
        {
            val: 'voterIdCard',
            key: 'Voter Id Card',
        },
        {
            val: 'other',
            key: 'Other',
        },
        {
            val: 'clubMembership',
            key: 'Club Membership',
        },
        ],
        bearer: [{
            val: 'self',
            key: 'Self',
        },
        {
            val: 'spouse',
            key: 'Spouse',
        },
        {
            val: 'child',
            key: 'Child',
        }],
    }]

    const initialValues = {
        idDetail: [{
            documentType: '',
            bearer: '',
            name: '',
            idNo: '',
            expiryDate: '',
        }]
    }

    const validationSchema = Yup.object({
        idDetail: Yup.array(Yup.object({
            documentType: Yup.string().required('Mandatory Field!').min(4, 'Invalid Name!'),
            bearer: Yup.string().required('Mandatory Field!').min(4, 'Invalid Input!'),
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            idNo: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            expiryDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Documents Details</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Documents Details</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='idDetail'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { idDetail } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {idDetail.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`idDetail-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Id Detail-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Type' name={`idDetail[${index}].documentType`} placeholder='Submit Document Type' options={dropDownOption[0].documentType} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Bearer' name={`idDetail[${index}].bearer`} placeholder='Document Bearer Person' options={dropDownOption[0].bearer} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`idDetail[${index}].name`} placeholder='Submit Bearer Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Id Number' name={`idDetail[${index}].idNo`} placeholder='Submit Document Number' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Expiry Date' name={`idDetail[${index}].expiryDate`} placeholder='Submit Expiry Date' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.idDetail[0])}>Add More</Button>



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

export default IdDetails
