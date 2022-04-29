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

const CylinderAgency = () => {

    const [userRegister, setUserRegister] = useState({});

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Cylinder Agency";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])


    const getParam = 'getallgasagencydetail';
    const deleteParam = 'deletegasagency';
    const updateParam = 'updategasagency';

      
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
            field: 'consumerNo',
            headerName: 'Consumer No',
            width: 110,
            editable: true,
          },
        {
          field: 'depositAmt',
          headerName: 'Deposit Amount',
          width: 110,
          editable: true,
        },
        {
            field: 'phoneNoBook',
            headerName: 'Booking Phone No',
            width: 110,
            editable: true,
          },
        
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
        cylinderAgency: [{
            name: '',
            houseDetails: '',
            consumerNo: '',
            depositAmt: '',
            phoneNoBook: '',
        }]
    }

    const validationSchema = Yup.object({
        cylinderAgency: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            houseDetails: Yup.string().required('Mandatory Field!').min(9, 'Invalid Input!'),
            depositAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            consumerNo: Yup.string().required('Mandatory Field!').min(17, 'Invalid Input!'),
            phoneNoBook: Yup.string().required('Mobile Number is Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addgascylinder`,
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Gas Cylinder Agency Service Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Cylinder Agency Details</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='cylinderAgency'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { cylinderAgency } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {cylinderAgency.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`agency-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Agency-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Name' name={`cylinderAgency[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='House Detail' name={`cylinderAgency[${index}].houseDetails`} placeholder='Submit House Details' />
                                                                    </Grid>

                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Select Meter' name={`cylinderAgency[${index}].meter`} placeholder='Submit Document Name' options={dropDownOption[0].meter} />
                                                                    </Grid> */}


                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Customer No.' name={`cylinderAgency[${index}].consumerNo`} placeholder='Submit Consumer Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Deposit Rs.' name={`cylinderAgency[${index}].depositAmt`} placeholder='Submit Deposit Amount' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Refill Phone Number' name={`cylinderAgency[${index}].phoneNoBook`} placeholder='Submit Phone Number For Refill Booking' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.cylinderAgency[0])}>Add More</Button>



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

export default CylinderAgency
