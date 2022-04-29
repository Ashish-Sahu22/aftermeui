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

const FixedRecrDeposits = () => {

    const [userRegister, setUserRegister] = useState({})

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Electric Water Meter";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallfixedrecurringdeposit';
    const deleteParam = 'deleteFixedRecurringDeposit';
    const updateParam = 'updateonefixedrecurring';

      
    const dataColumn = [{
          field: 'bankBranch',
          headerName: 'Bank Branch',
          width: 110,
          editable: true,
        },
        {
          field: 'depositType',
          headerName: 'Deposit Type',
          width: 110,
          editable: true,
        },
        {
            field: 'holderName',
            headerName: 'Holder Name',
            width: 110,
            editable: true,
          },
        {
          field: 'nominee',
          headerName: 'Nominee',
          width: 110,
          editable: true,
        },
        {
            field: 'depositDate',
            headerName: 'Deposit Date',
            width: 110,
            editable: true,
          },
          {
            field: 'depositAmt',
            headerName: 'Deposit Amount',
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
        fixedRecrDeposits: [{
            bankBranch: '',
            depositType: '',
            holderName: '',
            nominee: '',
            depositDate: '',
            depositAmt: '',
        }]
    }

    const validationSchema = Yup.object({
        fixedRecrDeposits: Yup.array(Yup.object({
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            depositType: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            holderName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            nominee: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            depositDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            depositAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addfixedrecurringdeposit`,
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Fixed/Recurring/Company Deposits</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Deposits</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='fixedRecrDeposits'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { fixedRecrDeposits } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {fixedRecrDeposits.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`deposits-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Deposits-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' type='text' label='Bank and Branch Details' name={`fixedRecrDeposits[${index}].bankBranch`} placeholder='Submit Bank and Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Deposit Type' name={`fixedRecrDeposits[${index}].depositType`} placeholder='Submit Type Of Deposit' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control="input" type='text' label='Account Holder' name={`fixedRecrDeposits[${index}].holderName`} placeholder='Submit Account Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Nominee' name={`fixedRecrDeposits[${index}].nominee`} placeholder='Submit Nominee Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' type='text' label='Deposit Date' name={`fixedRecrDeposits[${index}].depositDate`} placeholder='Submit Date of Deposit' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Deposit Amount' name={`fixedRecrDeposits[${index}].depositAmt`} placeholder='Submit Amount Of Deposit (Rs)' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.fixedRecrDeposits[0])}>Add More</Button>



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

export default FixedRecrDeposits
