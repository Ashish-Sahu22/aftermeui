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
import { padding } from '@mui/system';
import GetList from '../userlist/GetList';
import { toast } from 'react-toastify';
import base_url from '../../constant/Bootapi';

const DebtLiabilities = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Debit Card";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])

    const getParam = 'getalldebitliability';
    const deleteParam = 'deletedebitliability';
    const updateParam = 'updatedebitliability';

    const dataColumn = [{
        field: 'name',
        headerName: 'Name',
        width: 110,
        editable: true,
    },
    {
        field: 'accountNo',
        headerName: 'Account Number',
        width: 110,
        editable: true,
    },
    {
        field: 'bank',
        headerName: 'Bank',
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

    const dropDownOption = [{
        crDrType: [{
            val: 'cr',
            key: 'Cr',
        },
        {
            val: 'dr',
            key: 'Dr',
        },
        ],

    }]

    const initialValues = {
        sessionToken: '',
        rId: '',
        grantorOf: '',
        debitLiabilities: [{
            name: '',
            accountNo: '',
            bank: '',
        }]
    }

    const validationSchema = Yup.object({
        grantorOf: Yup.string().required('Grantor Of Name is Mandatory!').min(3, 'Invalid User Name!'),
        debitLiabilities: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            accountNo: Yup.string().required('Mandatory Field!').matches(regex.bankAccountNo, 'Invalid Account Number!'),
            bank: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/adddebitliability`,
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                toast.success('Details Submited Successfully! ', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }, (error) => {
                console.log("error :", error);
                toast.error('Something Went Wrong! Try Again Sometime!', {
                    position: toast.POSITION.TOP_CENTER
                })
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>My Debt/Liabilities</Typography>

                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn} />
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
                                    <FieldArray name='debitLiabilities'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { debitLiabilities } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    <fieldset>
                                                        <legend>I am Grantor Of Mr.</legend>
                                                        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                            <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                            <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                            <Grid item xs={12} sm={12} md={6}>
                                                                <FormikControl control='input' type='text' label='Mr.' name='grantorOf' placeholder='Submit Name' />
                                                            </Grid>
                                                        </Grid>
                                                    </fieldset>
                                                    {debitLiabilities.map((childData, index, array) => (
                                                        <div className='formInputs' key={`debitLiabilities-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Id Detail-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name Of Debtor/Creditor' name={`debitLiabilities[${index}].name`} placeholder='Submit Name Of Debtor Or Creditor' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Account No' name={`debitLiabilities[${index}].accountNo`} placeholder='Submit Account Number' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Details' name={`debitLiabilities[${index}].bank`} placeholder='Submit Bank Details' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.debitLiabilities[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }}>Submit</Button>
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

export default DebtLiabilities
