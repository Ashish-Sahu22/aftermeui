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
import GetList from '../userlist/GetList';
import { toast } from 'react-toastify';
import base_url from '../../constant/Bootapi';

const ProvidentFund = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Provident Fund";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallpf';
    const deleteParam = 'deletepf';
    const updateParam = 'updatepf';
    
    const dataColumn = [{
          field: 'bankBranch',
          headerName: 'Bank and Branch Name',
          width: 110,
          editable: true,
        },
        {
          field: 'fvg',
          headerName: 'FVG.',
          width: 110,
          editable: true,
        },
        {
            field: 'accNo',
            headerName: 'Account No',
            width: 110,
            editable: true,
          },
        {
          field: 'maturityDate',
          headerName: 'maturity Date',
          width: 110,
          editable: true,
        },
        {
            field: 'nominees',
            headerName: 'Nominees',
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
        ppf: [{
            bankBranch: '',
            fvg: '',
            accNo: '',
            maturityDate: '',
            nominees: '',
        }]
    }

    const validationSchema = Yup.object({
        ppf: Yup.array(Yup.object({
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            fvg: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input'),
            accNo: Yup.string().required('Mandatory Field!').min(12, 'Invalid Input'),
            maturityDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            nominees: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addpf`, 
        values,
        // {
        //     headers:{"Access-Control-Allow-Origin": "*"}
        // }
        ).then(
            (response) => {
                console.log("success", response);
                toast.success('Details Submited Successfully! ',{
                    position: toast.POSITION.TOP_CENTER,
                });  
                // navigate('/login')           
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Public Provident Fund (PPF) Account Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                    <legend className='headingLegend'> <Typography variant='h5' color='primary'>PPF Accounts</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='ppf'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { ppf } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {ppf.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`ppf-${index}`}>
                                                            <fieldset>
                                                                <legend>{`PPF-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Details' name={`ppf[${index}].bankBranch`} placeholder='Submit Bank and Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Fvg.' name={`ppf[${index}].fvg`} placeholder='Submit FVG' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='PPF No.' name={`ppf[${index}].accNo`} placeholder='Submit PPF Account No.' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Maturity Date' name={`ppf[${index}].maturityDate`} placeholder='Submit Maturity Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Nominee' name={`ppf[${index}].nominees`} placeholder='Submit Nominees Name' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.ppf[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId);}}>Submit</Button>
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

export default ProvidentFund
