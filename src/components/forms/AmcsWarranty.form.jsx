import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography,Paper } from '@mui/material';
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


const AmcsWarranty = () => {

    const [userRegister, setUserRegister] = useState({})

    const dropDownOption = [{
        docLoc: [{
            val: 'personalWill',
            key: 'Personal Will',
        },
        {
            val: 'spousesWill',
            key: 'Spouse\'s Will',
        },
        {
            val: 'insurancePolicies',
            key: 'Insurance Policies',
        },
        {
            val: 'investPapers',
            key: 'Invest. Papers',
        },
        {
            val: 'propertyRecords',
            key: 'Property Records',
        },
        {
            val: 'birthCertificate',
            key: 'Birth Certificate',
        },
        {
            val: 'marriageCertificate',
            key: 'Marriage Certificate',
        },
        {
            val: 'domicileCertificate',
            key: 'Domicile Certificate',
        },
        {
            val: 'importantAgreements',
            key: 'Important Agreements',
        },
        {
            val: 'otherPapers',
            key: 'Other Papers',
        },
        {
            val: 'educationalCertificates',
            key: 'Educational Certificates',
        },
        ],
    }]

    const initialValues = {
        amcsWarranty: [{
            productsModel: '',
            company: '',
            dateOfPurchase: '',
            purchaseValue: '',
            validUpto: '',
            amcRefNo: '',
            // remarks:'',
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
        await axios.post("http://localhost:8080/afterme/api/addamcswarranties", 
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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Amc's and Warranties</Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => {
                        return <Form>

                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Amc's & Warranties</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='amcsWarranty'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { amcsWarranty } = values;
                                            return (
                                                <div className='arrayInputs'>
                                                    {amcsWarranty.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`amcWarranty-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Amcs and Warranties-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Product' name={`amcsWarranty[${index}].productsModel`} placeholder='Submit Product and Model' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Company' name={`amcsWarranty[${index}].company`} placeholder='Submit Company' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Date of Purchase' name={`amcsWarranty[${index}].dateOfPurchase`} placeholder='Date of Purchase' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Purchase Value' name={`amcsWarranty[${index}].purchaseValue`} placeholder='Submit Purchase Value' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Valid Upto' name={`amcsWarranty[${index}].validUpto`} placeholder='Submit Warranty/AMC valid upto' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Reference No.' name={`amcsWarranty[${index}].amcRefNo`} placeholder='Submit AMC Reference Number' />
                                                                    </Grid>

                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Remarks' name={`amcsWarranty[${index}].remarks`} placeholder='Submit Remarks' />
                                                                    </Grid> */}
                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Name' name={`amcsWarranty[${index}].docName`} placeholder='Submit Document Name' options={dropDownOption[0].docLoc} />
                                                                    </Grid> */}
                                                                    {
                                                                        array.length > 1 &&
                                                                        <Grid item xs={12} sm={12} md={12}>


                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => remove(index)}>Remove</Button>

                                                                        </Grid>
                                                                    }
                                                                </Grid>
                                                            </fieldset>

                                                        </div>
                                                    ))}

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.amcsWarranty[0])}>Add More</Button>



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

export default AmcsWarranty