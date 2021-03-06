import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, CircularProgress, Paper, Typography } from '@mui/material';
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

const InsuranceDetails = () => {

    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Insurance Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getinsurance';
    const deleteParam = 'deleteinsurance';
    const updateParam = 'updateinsurance';

      
    const dataColumn = [{
          field: 'nomineeName',
          headerName: 'Nominee Name',
          width: 110,
          editable: true,
        },
        {
          field: 'policyNo',
          headerName: 'Policy No',
          width: 110,
          editable: true,
        },
        {
            field: 'issuingOffice',
            headerName: 'Issuing Office',
            width: 110,
            editable: true,
          },
        {
          field: 'amtInsured',
          headerName: 'Amt Insured',
          width: 110,
          editable: true,
        },
        {
            field: 'issueDate',
            headerName: 'Issue Date',
            width: 110,
            editable: true,
          },
          {
            field: 'maturityDate',
            headerName: 'Maturity Date',
            width: 110,
            editable: true,
          },
          {
            field: 'tableTerm',
            headerName: 'Table Term',
            width: 110,
            editable: true,
          },
          {
            field: 'premiumAmt',
            headerName: 'Premium Amount',
            width: 110,
            editable: true,
          },
          {
            field: 'premiumDueDate',
            headerName: 'Premium Due Date',
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

    const initialValues = {
        sessionToken: '',
        rId: '',
        insurance: [{
            nomineeName: '',
            policyNo: '',
            issuingOffice: '',
            amtInsured: '',
            issueDate: '',
            maturityDate: '',
            tableTerm: '',
            premiumAmt: '',
            premiumDueDate: '',
        }]
    }

    const validationSchema = Yup.object({
        insurance: Yup.array(Yup.object({
            nomineeName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            policyNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            issuingOffice: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            amtInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            maturityDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            tableTerm: Yup.string().required('Mandatory Field!').min(2, 'Invalid Input!'),
            premiumAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            premiumDueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addinsurance`,
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
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Insurance - LIC Policy Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Insurance Details</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='insurance'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { insurance } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {insurance.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`insurance-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Insurance-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Nominee Name' name={`insurance[${index}].nomineeName`} placeholder='Submit Nominee Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Policy Number' name={`insurance[${index}].policyNo`} placeholder='Submit Policy Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Issuing Office Details' name={`insurance[${index}].issuingOffice`} placeholder='Issuing Office Details' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Amount Insured' name={`insurance[${index}].amtInsured`} placeholder='Submit Amount Insured' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date' name={`insurance[${index}].issueDate`} placeholder='Submit Issue Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Maturity Date' name={`insurance[${index}].maturityDate`} placeholder='Submit Maturity Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Table & Term' name={`insurance[${index}].tableTerm`} placeholder='Submit Table and Terms' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Premium Amount' name={`insurance[${index}].premiumAmt`} placeholder='Submit Premium Amount' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Premium Due Date' name={`insurance[${index}].premiumDueDate`} placeholder='Premium Due Date' />
                                                                    </Grid>
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.insurance[0])}>Add More</Button>



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

export default InsuranceDetails
