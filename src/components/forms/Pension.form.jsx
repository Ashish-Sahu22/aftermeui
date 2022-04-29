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

const PensionAccount = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Pension Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getpensionacc';
    const deleteParam = 'deletepensionacc';
    const updateParam = 'updatepensionacc';
    
    const dataColumn = [{
          field: 'bankBranch',
          headerName: 'Bank Branch',
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
            field: 'operatingInstruction',
            headerName: 'Operating Instruction',
            width: 110,
            editable: true,
          },
        {
          field: 'paymentNo',
          headerName: 'Payment No',
          width: 110,
          editable: true,
        },
        {
            field: 'restorationDate',
            headerName: 'Restoration Date',
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
            field: 'dueDateLife',
            headerName: 'Due Date Life',
            width: 110,
            editable: true,
          },
          {
            field: 'sign',
            headerName: 'Sign',
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
        pensionAcc: [{
            bankBranch: '',
            accountNo: '',
            operatingInstruction: '',
            paymentNo: '',
            restorationDate: '',
            nominee: '',
            dueDateLife: '',
            sign: '',
        }]
    }

    const validationSchema = Yup.object({
        pensionAcc: Yup.array(Yup.object({
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            accountNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            operatingInstruction: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            paymentNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            restorationDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            nominee: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            dueDateLife: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            sign: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addpensionacc`,
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
        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };



    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Pension Accounts</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Pension Accounts</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='pensionAcc'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { pensionAcc } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {pensionAcc.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`pensionAcc-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Account-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Details' name={`pensionAcc[${index}].bankBranch`} placeholder='Submit Bank and Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' type='text' label='Type & Account No' name={`pensionAcc[${index}].accountNo`} placeholder='Submit Type Of Account & Account Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Operating Instruction' name={`pensionAcc[${index}].operatingInstruction`} placeholder='Submit Operating Instruction' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Payment Order Number' name={`pensionAcc[${index}].paymentNo`} placeholder='Submit Pension Payment Order Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Restoration Date' name={`pensionAcc[${index}].restorationDate`} placeholder='Submit Pension Communication Restoration Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Nominees' name={`pensionAcc[${index}].nominee`} placeholder='Submit Nominees' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Due Date' name={`pensionAcc[${index}].dueDateLife`} placeholder='Submit Due Date for Life Certificate' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Signature' name={`pensionAcc[${index}].sign`} placeholder='Submit Signature' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.pensionAcc[0])}>Add More</Button>



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

export default PensionAccount
