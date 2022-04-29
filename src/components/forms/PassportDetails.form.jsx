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

const PassportDetails = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Passport Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallpassportdetails';
    const deleteParam = 'deletepassport';
    const updateParam = 'updatepassport';
    
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'passportNo',
          headerName: 'Passport Number',
          width: 110,
          editable: true,
        },
        {
            field: 'issueDate',
            headerName: 'Issue Date',
            width: 110,
            editable: true,
          },
        {
          field: 'expiryDate',
          headerName: 'Expiry Date',
          width: 110,
          editable: true,
        },
        {
            field: 'issuingAuthority',
            headerName: 'Issuing Authority',
            width: 110,
            editable: true,
          },
          {
            field: 'previousPassports',
            headerName: 'Previous Passports',
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
        passportDetails: [{
            name: '',
            passportNo: '',
            issueDate: '',
            expiryDate: '',
            issuingAuthority: '',
            previousPassports: '',
        }]
    }

    const validationSchema = Yup.object({
        passportDetails: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            passportNo: Yup.string().required('Mandatory Field!').matches(regex.passport, 'Invalid Input'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            expiryDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            issuingAuthority: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            previousPassports: Yup.string().required('Mandatory Field!').matches(regex.passport, 'Invalid Input'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        const token = window.sessionStorage.getItem('token');
        console.log('usertoken :', token)
        await axios.post(`${base_url}/api/addpassport`,
            values
            // { 
            //     headers: {
            //         "Content-Type":"application/json",
            //         "token": token
            //     } 
            // }
        ).then(
            (response) => {
                console.log("success", response);
                console.log("success", response.headers.token);
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Passport Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Passport Details</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='passportDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { passportDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {passportDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`passportDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Passport-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`passportDetails[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Passport No.' name={`passportDetails[${index}].passportNo`} placeholder='Submit Passport Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date' name={`passportDetails[${index}].issueDate`} placeholder='Submit Issue Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Expiry Date' name={`passportDetails[${index}].expiryDate`} placeholder='Submit Expiry Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Issuing Authority' name={`passportDetails[${index}].issuingAuthority`} placeholder='Submit Issuing Authority' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Previous Passports' name={`passportDetails[${index}].previousPassports`} placeholder='Submit Previous Passport Details' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.passportDetails[0])}>Add More</Button>



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

export default PassportDetails
