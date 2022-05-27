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

const CreditDebit = () => {

    const [userRegister, setUserRegister] = useState({})

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Credit Debit";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])

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

    const getParam = 'getcrdrs';
    const deleteParam = 'deletecrdr';
    const updateParam = 'updatecrdr';
    
    const dataColumn = [{
          field: 'nameOfCrDr',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'crDr',
          headerName: 'Cr./Dr.',
          width: 110,
          editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 110,
            editable: true,
          },
        {
          field: 'date',
          headerName: 'Date',
          width: 110,
          editable: true,
          type: 'dateTime',
        },
        {
            field: 'dueDate',
            headerName: 'Due Date',
            width: 110,
            editable: true,
            type: 'dateTime',
          },
          {
            field: 'inttRate',
            headerName: 'Intrest Rate',
            width: 110,
            editable: true,
          },
                 
      ];

    const initialValues = {
        sessionToken: '',
        rId: '',
        creditDebit: [{
            nameOfCrDr: '',
            crDr: '',
            amount: '',
            date: '',
            dueDate: '',
            inttRate: '',
        }]
    }

    const validationSchema = Yup.object({
        creditDebit: Yup.array(Yup.object({
            nameOfCrDr: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            crDr: Yup.string().required('Mandatory Field!').min(2, 'Invalid Input!'),
            amount: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            date: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            dueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            inttRate: Yup.number().required('Mandatory Field!').min(1, 'Invalid Value!').max(100, 'Invalid Input!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addcrdr`,
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
                <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Credit / Debit Details</Typography>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Credit / Debit</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='creditDebit'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { creditDebit } = values;
                                            return (
                                                <div className='arrayInputs'>
                                                    {creditDebit.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`creditDebit-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Cr/Dr-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Cr/Dr' name={`creditDebit[${index}].crDr`} placeholder='Submit Document Type' options={dropDownOption[0].crDrType} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name Of Debtor/Creditor' name={`creditDebit[${index}].nameOfCrDr`} placeholder='Submit Name Of Debtor Or Creditor' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Amount' name={`creditDebit[${index}].amount`} placeholder='Submit Amount (Rs)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' type='text' label='Cr./Dr. Date' name={`creditDebit[${index}].date`} placeholder='Submit Cr./Dr. Date' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Due Date' name={`creditDebit[${index}].dueDate`} placeholder='Submit Due Date Of Cr./Dr.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Intt. Rate' name={`creditDebit[${index}].inttRate`} placeholder='Submit Intt. Rate (Receivable/Payble)' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.creditDebit[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => {formik.setFieldValue("sessionToken", token);formik.setFieldValue("rId", userId); }}>Submit</Button>
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

export default CreditDebit
