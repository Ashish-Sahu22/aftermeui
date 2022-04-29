import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography, CircularProgress } from '@mui/material';
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
import GetList from '../userlist/GetList';
import { toast } from 'react-toastify';
import base_url from '../../constant/Bootapi';


const AccidentInsurance = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Accidental Insurance";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])

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
        sessionToken: '',
        rId: '',
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


    const getParam = 'getaccidentinsurances';
    const deleteParam = 'deleteaccidentinsurance';
    const updateParam = 'updateaccidentinsurance';


    const dataColumn = [{
        field: 'insuredName',
        headerName: 'Insured Name',
        width: 110,
        editable: true,
    },
    {
        field: 'insuranceCompany',
        headerName: 'Company',
        width: 110,
        editable: true,
    },
    {
        field: 'sumInsured',
        headerName: 'Sum Insured',
        width: 110,
        editable: true,
    },
    {
        field: 'risksCovered',
        headerName: 'Risks Covered',
        width: 110,
        editable: true,
    },
    {
        field: 'policyPeriod',
        headerName: 'Policy Period',
        width: 110,
        editable: true,
    },
    {
        field: 'premium',
        headerName: 'Premium',
        width: 110,
        editable: true,
    },
    {
        field: 'remarks',
        headerName: 'Remarks',
        width: 110,
        editable: true,
    },
        // {
        //   field: 'fullName',
        //   headerName: 'Full name',
        //   description: 'This column has a value getter and is not sortable.',
        //   sortable: false,
        //   width: 160,
        //   valueGetter: (params) =>
        //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },

    ];

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
        await axios.post(`${base_url}/api/addaccidentinsurance`,
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                toast.info('Details Submited Successfully! ',{
                    position: toast.POSITION.TOP_CENTER,
                });             
            }, (error) => {
                console.log("error :", error);
                toast.error('Something Went Wrong! Try Again Sometime!', {
                    position:toast.POSITION.TOP_CENTER})
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
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn} />
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
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
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
                                                                        <Grid item xs={12} sm={12} md={12}>
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
                                <Button
                                    type='submit'
                                    style={{ textAlign: 'center', margin: '8px 0px' }}
                                    variant='contained'
                                    color='primary'
                                    startIcon={formik.isSubmitting ? <CircularProgress size='1rem' /> : undefined}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                    onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }}
                                    >
                                    {formik.isSubmitting ? 'Submitting' : 'Submit'}
                   
                                </Button>

                                {/* <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }}>Submit</Button> */}
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
