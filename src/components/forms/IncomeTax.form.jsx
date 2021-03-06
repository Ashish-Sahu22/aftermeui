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

const IncomeTax = () => {

    const [userRegister, setUserRegister] = useState({});

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Income Tax";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallincometaxdetails';
    const deleteParam = 'deleteincometax';
    const updateParam = 'updateincometax';

      
    const dataColumn = [{
          field: 'assessmentYear',
          headerName: 'Assessment Year',
          width: 110,
          editable: true,
          type: 'date',
        },
        {
          field: 'grossIncome',
          headerName: 'Gross Income',
          width: 110,
          editable: true,
        },
        {
            field: 'lastReturnFiled',
            headerName: 'Last Return Filed',
            width: 110,
            editable: true,
            type: 'date',
          },
        {
          field: 'assessmentDone',
          headerName: 'Assessment Done',
          width: 110,
          editable: true,
          type: 'date',
        },
        {
            field: 'refundAmountDue',
            headerName: 'Refund Amount Due',
            width: 110,
            editable: true,
            type: 'date',
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
        incomeTax: [{
            assessmentYear: '',
            grossIncome: '',
            lastReturnFiled: '',
            assessmentDone: '',
            refundAmountDue: '',
        }]
    }

    const validationSchema = Yup.object({
        incomeTax: Yup.array(Yup.object({
            assessmentYear: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            grossIncome: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            lastReturnFiled: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            assessmentDone: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            refundAmountDue: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addincometax`,
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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Income Tax Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Income Tax</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='incomeTax'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { incomeTax } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {incomeTax.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`incomeTax-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Tax-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' type='text' label='Assessment Year' name={`incomeTax[${index}].assessmentYear`} placeholder='Submit Assessment Year' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Total Gross Income' name={`incomeTax[${index}].grossIncome`} placeholder='Submit Total Gross Income' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Last Return Filed' name={`incomeTax[${index}].lastReturnFiled`} placeholder='Submit Last Return Filed' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Assessment Done' name={`incomeTax[${index}].assessmentDone`} placeholder='Submit Assessment Done, If Any' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Refund Amount Due' name={`incomeTax[${index}].refundAmountDue`} placeholder='Submit Refund Amount Due, If Any' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.incomeTax[0])}>Add More</Button>



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

export default IncomeTax
