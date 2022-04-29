import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
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

const MedPolicyDetails = () => {

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Medical History";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallmediclaim';
    const deleteParam = 'deletemedi';
    const updateParam = 'updatemediclaim';
    
    const dataColumn = [{
          field: 'claimName',
          headerName: 'Claim Name',
          width: 110,
          editable: true,
        },
        {
          field: 'claimType',
          headerName: 'Claim Type',
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
          field: 'amtInsured',
          headerName: 'Amount Insured',
          width: 110,
          editable: true,
        },
        {
            field: 'policyStartDate',
            headerName: 'Policy Start Date',
            width: 110,
            editable: true,
          },
          {
            field: 'policyDueDate',
            headerName: 'Policy Due Date',
            width: 110,
            editable: true,
          },
          {
            field: 'premium',
            headerName: 'Premium',
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
        sessionToken: '',
        rId: '',
        mediclaim: [{
            claimName: '',
            claimType: '',
            policyNo: '',
            amtInsured: '',
            policyStartDate: '',
            policyDueDate: '',
            premium: '',
        }]
    }

    const validationSchema = Yup.object({
        mediclaim: Yup.array(Yup.object({
            claimName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            claimType: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            policyNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            amtInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            policyStartDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            policyDueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            premium: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addmediclaim`,
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
        console.log(data);

        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Mediclaim Policy Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                    <legend className='headingLegend'> <Typography variant='h5' color='primary'>Mediclaim Policies</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='mediclaim'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { mediclaim } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {mediclaim.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`mediclaim-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Policy-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Claim Name' name={`mediclaim[${index}].claimName`} placeholder='Submit Policy Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Claim Type' name={`mediclaim[${index}].claimType`} placeholder='Submit Policy Type' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Policy Number' name={`mediclaim[${index}].policyNo`} placeholder='Submit Policy No. / Previous Policy No. ' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Amount Insured' name={`mediclaim[${index}].amtInsured`} placeholder='Submit Amount Insured' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Policy Start Date' name={`mediclaim[${index}].policyStartDate`} placeholder='Submit Policy Start Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Policy Due Date' name={`mediclaim[${index}].policyDueDate`} placeholder='Submit Due Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Premium' name={`mediclaim[${index}].premium`} placeholder='Submit Premium' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.mediclaim[0])}>Add More</Button>



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

                                {/* <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId);}}>Submit</Button> */}
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

export default MedPolicyDetails
