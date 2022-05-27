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
import { toast } from 'react-toastify';
import base_url from '../../constant/Bootapi';

const DebitCardDetails = () => {

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

    const getParam = 'getalldebitcarddetails';
    const deleteParam = 'deletedebitcard';
    const updateParam = 'updatedebitcard';

      
    const dataColumn = [{
          field: 'holderName',
          headerName: 'Holder Name',
          width: 110,
          editable: true,
        },
        {
          field: 'bankBranch',
          headerName: 'Bank Branch',
          width: 110,
          editable: true,
        },
        {
            field: 'cardNo',
            headerName: 'Card Number',
            width: 110,
            editable: true,
          },
        {
          field: 'issueDate',
          headerName: 'Issue Date',
          width: 110,
          editable: true,
          type: 'date',
        },
        {
            field: 'validThru',
            headerName: 'Valid Through',
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
        debitCardDetails: [{
            holderName: '',
            bankBranch: '',
            cardNo: '',
            issueDate: '',
            validThru: '',
            accidentCover: '',
        }]
    }

    const validationSchema = Yup.object({
        debitCardDetails: Yup.array(Yup.object({
            holderName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            cardNo: Yup.string().required('Mandatory Field!').matches(regex.re16digit, 'Invalid Input!'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            validThru: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            accidentCover: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/adddebitcard`,
        values,
        // {
        //     headers:{"Access-Control-Allow-Origin": "*"}
        // }
    ).then(
        (response) => {
            console.log("success", response);
            toast.info('Details Submited Successfully!',{
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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>ATM / Debit Card Detail</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Debit Cards</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='debitCardDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { debitCardDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {debitCardDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`debitCardDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Card-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Holder Name' name={`debitCardDetails[${index}].holderName`} placeholder='Submit Card Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Details' name={`debitCardDetails[${index}].bankBranch`} placeholder='Submit Bank and Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Card Number' name={`debitCardDetails[${index}].cardNo`} placeholder='Submit ATM/Debit Card Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date' name={`debitCardDetails[${index}].issueDate`} placeholder='Submit Issue Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid Thru' name={`debitCardDetails[${index}].validThru`} placeholder='Submit Valid Thru' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Personal Accident Cover' name={`debitCardDetails[${index}].accidentCover`} placeholder='Submit Personal Accident Cover' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.debitCardDetails[0])}>Add More</Button>



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

export default DebitCardDetails
