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
import GetList from '../userlist/GetList';

const TradingAccount = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Trading Account";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getOnlineTrading';
    const deleteParam = 'deleteOnline';
    const updateParam = 'updateOnline';
    
    const dataColumn = [{
          field: 'vendorName',
          headerName: 'Vendor Name',
          width: 110,
          editable: true,
        },
        {
          field: 'nsdlCsdl',
          headerName: 'NSDL CSDL',
          width: 110,
          editable: true,
        },
        {
            field: 'accountNo',
            headerName: 'Account No',
            width: 110,
            editable: true,
          },
        {
          field: 'bankAccount',
          headerName: 'Bank Account',
          width: 110,
          editable: true,
        },
        {
            field: 'depositoryParticipant',
            headerName: 'Depository Participant',
            width: 110,
            editable: true,
          },
          {
            field: 'userId',
            headerName: 'User Id',
            width: 110,
            editable: true,
          },
          {
            field: 'password',
            headerName: 'Password',
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
        tradeAccount: [{
            vendorName: '',
            nsdlCsdl: '',
            accountNo: '',
            bankAccount: '',
            depositoryParticipant: '',
            userId: '',
            password: '',
            remarks: '',
        }]
    }

    const validationSchema = Yup.object({
        tradeAccount: Yup.array(Yup.object({
            vendorName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            nsdlCsdl: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            accountNo: Yup.string().required('Mandatory Field!').matches(regex.bankAccountNo, 'Invalid Input'),
            bankAccount: Yup.string().required('Mandatory Field!').min(5,"Invalid Input"),
            depositoryParticipant: Yup.string().required('Mandatory Field!').min(3,"Invalid Input"),
            userId: Yup.string().required('Mandatory Field!').min(3,"Invalid Input"),
            password: Yup.string().required('Mandatory Field!').min(4, 'Invalid Password'),
            remarks: Yup.string().required('Mandatory Field!').min(6, 'Invalid Input'),
            }))
    });

    const onSubmit = async (values, onSubmitProps) => {
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Online Trading Accounts Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Trading Accounts Details</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='tradeAccount'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { tradeAccount } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {tradeAccount.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`account-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Account-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Vendor Name' name={`tradeAccount[${index}].vendorName`} placeholder='Submit Vendor Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='NSDL/CSDL' name={`tradeAccount[${index}].nsdlCsdl`} placeholder='Submit NSDL/CSDL' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control="input" type='text' label='Account Number' name={`tradeAccount[${index}].accountNo`} placeholder='Submit Account Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Attached Bank Account Details' name={`tradeAccount[${index}].bankAccount`} placeholder='Attached Bank Account Details' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Attached Depository Participant Details' name={`tradeAccount[${index}].depositoryParticipant`} placeholder='Attached Depository Participant Details' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='User ID' name={`tradeAccount[${index}].userId`} placeholder='Submit User Id' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='password' label='Password' name={`tradeAccount[${index}].password`} placeholder='Submit Password' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Remarks' name={`tradeAccount[${index}].remarks`} placeholder='Submit Remarks' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.tradeAccount[0])}>Add More</Button>



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

export default TradingAccount
