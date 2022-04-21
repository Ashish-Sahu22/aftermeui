import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
// import { CalendarToday, Publish, CalendarTodayRounded, CalendarViewDay, CalendarViewDayRounded, LocationSearching, MailOutlined, PermIdentity, PhoneAndroid, Sync, TonalitySharp } from '@material-ui/icons';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import '../new-user/newuser.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import GetList from '../userlist/GetList';

// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function VehicleInsurance() {

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Vehicle Insurance";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getbankaccount';
    const deleteParam = 'deletebankaccount';
    const updateParam = 'updatebankaccount';
    
    const dataColumn = [{
          field: 'year',
          headerName: 'Year',
          width: 110,
          editable: true,
        },
        {
          field: 'insCompany',
          headerName: 'Insurance Company',
          width: 110,
          editable: true,
        },
        {
            field: 'policyNo',
            headerName: 'Policy No',
            width: 110,
            editable: true,
          },
        {
          field: 'agentName',
          headerName: 'Agent Name',
          width: 110,
          editable: true,
        },
        {
            field: 'agentMob',
            headerName: 'Agent Mobile',
            width: 110,
            editable: true,
          },
          {
            field: 'agentEmail',
            headerName: 'Agent Email',
            width: 110,
            editable: true,
          },
          {
            field: 'sumInsured',
            headerName: 'Sum Insured',
            width: 110,
            editable: true,
          },
          {
            field: 'noClaimBonus',
            headerName: 'No Claim Bonus',
            width: 110,
            editable: true,
          },
          {
            field: 'policyStartDate',
            headerName: 'Policy Start Date',
            width: 110,
            editable: true,
          },
          {
            field: 'policyDueDate',
            headerName: 'Policy Due Date',
            width: 110,
            editable: true,
          },
          {
            field: 'premium',
            headerName: 'Premium',
            width: 110,
            editable: true,
          },
          {
            field: 'remarks',
            headerName: 'Remarks',
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
        name: '',
        vName: '',
        vDetails: [{
            year: '',
            insCompany: '',
            policyNo: '',
            agentName: '',
            agentMob: '',
            agentEmail: '',
            sumInsured: '',
            noClaimBonus: '',
            policyStartDate: '',
            policyDueDate: '',
            premium: '',
            remarks: '',
        }],
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        vName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        
        vDetails: Yup.array(Yup.object({
            year: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            insCompany: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            policyNo: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            agentName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            agentMob: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Input!'),
            agentEmail: Yup.string().required('Mandatory Field!').matches(regex.email, 'Invalid Email!'),
            sumInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            noClaimBonus: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input!'),
            policyStartDate: Yup.date().required('Mandatory Field!').typeError("Invalid Input!"),
            policyDueDate: Yup.date().required('Mandatory Field!').typeError("Invalid Input!"),
            premium: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            remarks: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        // await axios.post("http://a011-2405-201-401c-11a0-5c9-9804-e2c9-df50.ngrok.io/afterme/api/addSelf",
        //     values,
        //     // {
        //     //     headers:{"Access-Control-Allow-Origin": "*"}
        //     // }
        // ).then(
        //     (response) => {
        //         console.log("success", response);
        //         // toast.success('Your Registration Successfully Done! ',{
        //         //     position: toast.POSITION.TOP_CENTER,
        //         // });             
        //     }, (error) => {
        //         console.log("error :", error);
        //         // toast.error('Something Went Wrong! Try Again Sometime!', {
        //         //     position:toast.POSITION.TOP_CENTER})
        //     }
        // )

        const data = JSON.stringify(values);
        console.log(data);
        console.log(values.userName);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Vehicle Insurance Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>
                                {/* 
                            <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'> Me and My family Details </Typography></legend> */}

                                <div className='formInputs'>

                                    <fieldset>
                                        <legend>Vehicle Insurance</legend>
                                        <div className='childsInputs'>
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} style={{ marginBottom: '24px' }}>
                                                <Grid item xs={12} sm={6}>
                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                    <FormikControl control='input' type='text' label='Name/Vehicle' name='name' placeholder='Submit Name/Vehicle' />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <FormikControl control='input' type='text' label='Vehicle Name' name='vName' placeholder='Submit Vehicle Name' />
                                                </Grid>
                                            </Grid>
                                        </div>
                                        <FieldArray name='vDetails'>
                                            {(ArrayHelpers) => (
                                                <div>
                                                    {formik.values.vDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`vDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Vehicle Insurance Details-${index + 1}`}</legend>
                                                                <div className='formInput'>
                                                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Year' name={`vDetails.[${index}].year`} placeholder='Submit Year' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Insurance Company' name={`vDetails.[${index}].insCompany`} placeholder='Submit Insurance Company' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Policy Number' name={`vDetails.[${index}].policyNo`} placeholder='Submit Policy Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Agent Name' name={`vDetails.[${index}].agentName`} placeholder='Submit Agent Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Agent Mobile No.' name={`vDetails.[${index}].agentMob`} placeholder='Submit Agent Mobile Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Agent Email' name={`vDetails.[${index}].agentEmail`} placeholder='Submit Agent Email' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='Sum Insured' name={`vDetails.[${index}].sumInsured`} placeholder='Submit Sum Insured' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' type='text' label='No Claim Bonus' name={`vDetails.[${index}].noClaimBonus`} placeholder='Submit No Claim Bonus' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='date' label='Policy Start Date' name={`vDetails.[${index}].policyStartDate`} placeholder='Submit Policy Start Date' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='date' label='Policy Due Date' name={`vDetails.[${index}].policyDueDate`} placeholder='Submit Policy Due Date' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Premium' name={`vDetails.[${index}].premium`} placeholder='Submit Premium' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='textarea' label='Remarks' name={`vDetails.[${index}].remarks`} placeholder='Submit Remarks' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={12}>
                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>
                                                                        </Grid>
                                                                        
                                                                    </Grid>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    ))}
                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.vDetails[0])}>Add Child</Button>

   
                                                </div>
                                            )}
                                        </FieldArray>
                                    </fieldset>
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

export default VehicleInsurance