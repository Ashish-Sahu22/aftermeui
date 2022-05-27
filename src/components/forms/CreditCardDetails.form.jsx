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


const CreditCardDetails = () => {

    const [userRegister, setUserRegister] = useState({})

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
        creditCardDetails: [{
            holderName: '',
            bankName: '',
            cardNo: '',
            validFrom: '',
            validThru: '',
        }]
    }

    const getParam = 'getallcreditcarddetails';
    const deleteParam = 'deletecreditcard';
    const updateParam = 'updatecreditcard';

      
    const dataColumn = [
        {
          field: 'holderName',
          headerName: 'Holder Name',
          width: 110,
          editable: true,
        },
        {
          field: 'bankName',
          headerName: 'Bank Name',
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
          field: 'validFrom',
          headerName: 'Valid From',
          width: 110,
          editable: true,
          type: 'date',
        },
        {
            field: 'validThru',
            headerName: 'Valid Through',
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

    const validationSchema = Yup.object({
        creditCardDetails: Yup.array(Yup.object({
            holderName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            bankName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            cardNo: Yup.string().required('Mandatory Field!').matches(regex.re16digit, 'Invalid Input'),
            validFrom: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            validThru: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))    
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addcreditcard`,
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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Credit Card Details</Typography>
                <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>
                                <div className='formInputs'>

                                    <FieldArray name='creditCardDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { creditCardDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {creditCardDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`creditCardDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Card-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Holder Name' name={`creditCardDetails[${index}].holderName`} placeholder='Submit Card Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Bank Name' name={`creditCardDetails[${index}].bankName`} placeholder='Submit Bank Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Card Number' name={`creditCardDetails[${index}].cardNo`} placeholder='Submit Credit Card Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid From ' name={`creditCardDetails[${index}].validFrom`} placeholder='Submit Valid From' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid Thru' name={`creditCardDetails[${index}].validThru`} placeholder='Submit Valid Thru' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.creditCardDetails[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
                        </Form>
                    }
                    }
                </Formik>
            </Paper>
        </div>
        </div >

    )
}

export default CreditCardDetails
