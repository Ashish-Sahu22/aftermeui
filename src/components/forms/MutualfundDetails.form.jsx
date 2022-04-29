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

const MutualfundDetails = () => {

    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Mutualfund Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallmutualfund';
    const deleteParam = 'deletemutual';
    const updateParam = 'updatemutual';
    
    const dataColumn = [{
          field: 'company',
          headerName: 'Company Name',
          width: 110,
          editable: true,
        },
        {
          field: 'folioNo',
          headerName: 'Folio Number',
          width: 110,
          editable: true,
        },
        {
            field: 'lumpSumSip',
            headerName: 'Lump Sum SIP',
            width: 110,
            editable: true,
          },
        {
          field: 'fundName',
          headerName: 'Fund Name',
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
            field: 'bankAccountDetails',
            headerName: 'Bank Account Details',
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
        mutualfundDetails: [{
            company: '',
            folioNo: '',
            lumpSumSip: '',
            fundName: '',
            amount: '',
            bankAccountDetails: '',
        }]
    }

    const validationSchema = Yup.object({
        mutualfundDetails: Yup.array(Yup.object({
            company: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            folioNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            lumpSumSip: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            fundName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            amount: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            bankAccountDetails: Yup.string().required('Mandatory Field!').min(18, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addMutualFund`,
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Mutual Fund Details SIPs</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                    <legend className='headingLegend'> <Typography variant='h5' color='primary'>Mutual Funds</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='mutualfundDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { mutualfundDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {mutualfundDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`mutualfund-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Mutual Fund-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Company' name={`mutualfundDetails[${index}].company`} placeholder='Submit Company' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Folio Number' name={`mutualfundDetails[${index}].folioNo`} placeholder='Submit Folio Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control="input" type='text' label='Lump Sum/SIP' name={`mutualfundDetails[${index}].lumpSumSip`} placeholder='Submit Lump Sum / SIPs' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Fund Name' name={`mutualfundDetails[${index}].fundName`} placeholder='Fund Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Amount' name={`mutualfundDetails[${index}].amount`} placeholder='Submit Amount (Rs)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Account' name={`mutualfundDetails[${index}].bankAccountDetails`} placeholder='Submit Attached Bank Account Details' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.mutualfundDetails[0])}>Add More</Button>



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

export default MutualfundDetails
