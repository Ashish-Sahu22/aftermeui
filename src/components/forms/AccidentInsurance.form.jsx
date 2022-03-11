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


const AccidentInsurance = () => {

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
        accidentInsurance: [{
            insuredName: '',
            insuranceCompany: '',
            sumInsured: '',
            risksCovered: '',
            policyPeriod: '',
            premium: '',
            remarks: '',
        }]
    }

    const validationSchema = Yup.object({
        accidentInsurance: Yup.array(Yup.object({
            insuredName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            insuranceCompany: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            sumInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            risksCovered: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            policyPeriod: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            premium: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            remarks: Yup.string().required('Mandatory Field!').min(5, 'Invalid Value!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addaccidentinsurance",
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Personal Accident Insurance Details</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset> */}
                                {/* <legend className='headingLegend'> <Typography variant='h5' color='primary'>Accidental Insurance</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='accidentInsurance'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { accidentInsurance } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {accidentInsurance.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`AccidentIns-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Insurance-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Name of Insured(s)' name={`accidentInsurance[${index}].insuredName`} placeholder='Submit Name of Insured(s)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Insurance Company' name={`accidentInsurance[${index}].insuranceCompany`} placeholder='Submit Insurance Company' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Sum Insured' name={`accidentInsurance[${index}].sumInsured`} placeholder='Submit Insured Sum (Rs)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Risks Covered' name={`accidentInsurance[${index}].risksCovered`} placeholder='Submit Risks Covered' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Policy Period' name={`accidentInsurance[${index}].policyPeriod`} placeholder='Submit Policy Period' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Premium (Rs)' name={`accidentInsurance[${index}].premium`} placeholder='Submit Premium (Rs)' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Remarks' name={`accidentInsurance[${index}].remarks`} placeholder='Submit Remarks' />
                                                                    </Grid>
                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Name' name={`accidentInsurance[${index}].docName`} placeholder='Submit Document Name' options={dropDownOption[0].docLoc} />
                                                                    </Grid> */}

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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.accidentInsurance[0])}>Add More</Button>

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

export default AccidentInsurance
