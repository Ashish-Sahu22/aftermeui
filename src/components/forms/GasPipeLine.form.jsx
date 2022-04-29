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

const GasPipeLine = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Gas Pipe Line";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallgaspipelinedetails';
    const deleteParam = 'deletegaspipeline';
    const updateParam = 'updategaspipeline';

      
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'houseDetails',
          headerName: 'House Details',
          width: 110,
          editable: true,
        },
        {
            field: 'meterNo',
            headerName: 'Meter No',
            width: 110,
            editable: true,
          },
        {
          field: 'customerNo',
          headerName: 'Customer No',
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


    const dropDownOption = [{
        meter: [{
            val: 'electric meter',
            key: 'Electric Meter',
        },
        {
            val: 'water meter',
            key: 'Water Meter',
        },
        ],
    }]

    const initialValues = {
        sessionToken: '',
        rId: '',
        gaspipeline: [{
            name: '',
            houseDetails: '',
            meterNo: '',
            customerNo: '',
            depositAmt: '',
        }]
    }

    const validationSchema = Yup.object({
        gaspipeline: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            houseDetails: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            meterNo: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            customerNo: Yup.string().required('Mandatory Field!').min(10, 'Invalid Input!'),
            depositAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, "Invalid Input!"),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addgaspipeline`,
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Gas Pipe Line Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Gas Pipe Line Details</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='gaspipeline'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { gaspipeline } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {gaspipeline.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`Meter-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Line-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Name' name={`gaspipeline[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='House Detail' name={`gaspipeline[${index}].houseDetails`} placeholder='Submit House Details' />
                                                                    </Grid>

                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Select Meter' name={`gaspipeline[${index}].meter`} placeholder='Submit Document Name' options={dropDownOption[0].meter} />
                                                                    </Grid> */}

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Meter Number' name={`gaspipeline[${index}].meterNo`} placeholder='Submit Meter/Route Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Customer No.' name={`gaspipeline[${index}].customerNo`} placeholder='Submit Consumer Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Deposit Rs.' name={`gaspipeline[${index}].depositAmt`} placeholder='Submit Deposit Amount' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.gaspipeline[0])}>Add More</Button>



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

export default GasPipeLine
