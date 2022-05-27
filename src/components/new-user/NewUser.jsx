import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Paper, Typography } from '@mui/material';
// import { CalendarToday, Publish, CalendarTodayRounded, CalendarViewDay, CalendarViewDayRounded, LocationSearching, MailOutlined, PermIdentity, PhoneAndroid, Sync, TonalitySharp } from '@material-ui/icons';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import './newuser.css';
import axios from 'axios';
import Box from '@mui/material/Box';
import base_url from '../../constant/Bootapi'
// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
import { toast } from 'react-toastify';
import GetList from '../userlist/GetList';

function NewUser() {

    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Registration";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])

    // const authAxios = axios.create({
    //     baseURL: 'http://1634-60-254-104-154.ngrok.io/afterme/api/',
    //     headers: {
    //         "token" : token,
    //     }
    // })

    const getParam = 'getallchild';
    const deleteParam = 'deletechild';
    const updateParam = 'updatechild';

    const getParams = 'getallselfnew';
    const deleteParams = 'deleteself';
    const updateParams = 'updateself';

    const getParamsp = 'getallspouse';
    const deleteParamsp = 'deletespouse';
    const updateParamsp = 'updatespouse';

    const dataColumn = [
        {
            field: 'name',
            headerName: 'Name',
            width: 110,
            editable: true,
        },
        {
            field: 'dob',
            headerName: 'Dob',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'tob',
            headerName: 'Time of Birth',
            width: 110,
            editable: true,
        },
        {
            field: 'pob',
            headerName: 'Place of Birth',
            width: 110,
            editable: true,
        },
        {
            field: 'anniversary',
            headerName: 'Anniversary',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'mobNumber',
            headerName: 'Mobile Number',
            width: 110,
            editable: true,
        },
        {
            field: 'email',
            headerName: 'Email Id',
            width: 110,
            editable: true,
        },
        {
            field: 'bloodGroup',
            headerName: 'Blood Group',
            width: 110,
            editable: true,
        },
        {
            field: 'emergency',
            headerName: 'Emergency Number',
            width: 110,
            editable: true,
        },
        {
            field: 'organization',
            headerName: 'Organization',
            width: 110,
            editable: true,
        },
        {
            field: 'qualification',
            headerName: 'Qualification',
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

    const dataColumns = [
        {
            field: 'userName',
            headerName: 'Name',
            width: 110,
            editable: true,
        },
        {
            field: 'userDob',
            headerName: 'Date of Birth',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'userTob',
            headerName: 'Time of Birth',
            width: 110,
            editable: true,
        },
        {
            field: 'userPob',
            headerName: 'Place of Birth',
            width: 110,
            editable: true,
        },
        {
            field: 'userAnniversary',
            headerName: 'Anniversary',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'userMobNumber',
            headerName: 'Mobile Number',
            width: 110,
            editable: true,
        },
        {
            field: 'userEmail',
            headerName: 'Email Id',
            width: 110,
            editable: true,
        },
        {
            field: 'userBloodGroup',
            headerName: 'Blood Group',
            width: 110,
            editable: true,
        },
        {
            field: 'userEmergency',
            headerName: 'Emergency Number',
            width: 110,
            editable: true,
        },
        {
            field: 'userOrganization',
            headerName: 'Organization',
            width: 110,
            editable: true,
        },
        {
            field: 'userQualification',
            headerName: 'Qualification',
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

    
    const dataColumnsp = [
        {
            field: 'spouseName',
            headerName: 'Name',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseDob',
            headerName: 'Dob',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'spouseTob',
            headerName: 'Time of Birth',
            width: 110,
            editable: true,
            type: 'datetime'
        },
        {
            field: 'spousePob',
            headerName: 'Place of Birth',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseAnniversary',
            headerName: 'Anniversary',
            width: 110,
            editable: true,
            type: 'date',
        },
        {
            field: 'spouseMobNumber',
            headerName: 'Mobile Number',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseEmail',
            headerName: 'Email Id',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseBloodGroup',
            headerName: 'Blood Group',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseEmergency',
            headerName: 'Emergency Number',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseOrganization',
            headerName: 'Organization',
            width: 110,
            editable: true,
        },
        {
            field: 'spouseQualification',
            headerName: 'Qualification',
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
        userName: '',
        userDob: '',
        userTob: '',
        userPob: '',
        userAnniversary: '',
        userMobNumber: '',
        userEmail: '',
        userBloodGroup: '',
        userEmergency: '',
        userOrganization: '',
        userQualification: '',
        spouse: {
            spouseName: '',
            spouseDob: '',
            spouseTob: '',
            spousePob: '',
            spouseAnniversary: '',
            spouseMobNumber: '',
            spouseEmail: '',
            spouseBloodGroup: '',
            spouseEmergency: '',
            spouseOrganization: '',
            spouseQualification: '',
        },
        childs: [{
            name: '',
            dob: '',
            tob: '',
            pob: '',
            anniversary: '',
            mobNumber: '',
            email: '',
            bloodGroup: '',
            emergency: '',
            organization: '',
            qualification: '',
        }],
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        userDob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        userTob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        userPob: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        userAnniversary: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        userMobNumber: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
        userEmail: Yup.string().required('Email Mandatory Field!').matches(regex.email, 'Invalid Email!'),
        userBloodGroup: Yup.string().required('Mandatory Field!').matches(regex.bloodgroup, 'Invalid Blood Group!'),
        userEmergency: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
        userOrganization: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        userQualification: Yup.string().required('Mandatory Field!').min(2, 'Invalid Input!'),
        spouse: Yup.object({
            spouseName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            spouseDob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            spouseTob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            spousePob: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            spouseAnniversary: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            spouseMobNumber: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
            spouseEmail: Yup.string().required('Email Mandatory Field!').matches(regex.email, 'Invalid Email!'),
            spouseBloodGroup: Yup.string().required('Mandatory Field!').matches(regex.bloodgroup, 'Invalid Blood Group!'),
            spouseEmergency: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
            spouseOrganization: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            spouseQualification: Yup.string().required('Mandatory Field!').min(2, 'Invalid Input!'),
        }),
        childs: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            dob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            tob: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            pob: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            anniversary: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            mobNumber: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
            email: Yup.string().required('Email Mandatory Field!').matches(regex.email, 'Invalid Email!'),
            bloodGroup: Yup.string().required('Mandatory Field!').matches(regex.bloodgroup, 'Invalid Blood Group!'),
            emergency: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!'),
            organization: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            qualification: Yup.string().required('Mandatory Field!').min(2, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addself`, values
        ).then(
            (response) => {
                console.log("success", response);
                // console.log("success", response.headers.token);
                toast.success('Your Registration Successfully Done! ', {
                    position: toast.POSITION.TOP_CENTER,
                });
            }, (error) => {
                console.log("error :", error);
                // console.log("success", error.headers.token);
                toast.error('Something Went Wrong! Try Again Sometime!', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        )

        const data = JSON.stringify(values);
        console.log(data);
        console.log(values.userName);
        console.log('usertoken :', token);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>My Family Should Know</Typography>
                    <GetList getParam={getParams} updateParam={updateParams} deleteParam={deleteParams} dataColumn={dataColumns} />
                    <GetList getParam={getParamsp} updateParam={updateParamsp} deleteParam={deleteParamsp} dataColumn={dataColumnsp} />
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn} />
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
                                        <legend> Me</legend>
                                        <div className='formInput'>
                                            <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                            <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Name' name='userName' placeholder='Submit Name' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Date Of Birth' name='userDob' placeholder='Submit Dob' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Time Of Birth' name='userTob' placeholder='Submit Time of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' label='Place Of Birth' name='userPob' placeholder='Submit Place of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Anniversary' name='userAnniversary' placeholder='Submit Anniversary' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Mobile Number' name='userMobNumber' placeholder='Submit Mobile Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='email' label='Email Id' name='userEmail' placeholder='Submit Email Id' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Blood Group' name='userBloodGroup' placeholder='Submit Blood Group' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Emergency Contact' name='userEmergency' placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Organization Details' name='userOrganization' placeholder='Please Enter Organization Details with Contact Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Qualifications' name='userQualification' placeholder='Please Enter Educational Qualifications' />
                                                </Grid>
                                                {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                                {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}
                                            </Grid>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>My Spouse</legend>
                                        <div className='formInput'>
                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} >
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Name' name='spouse.spouseName' placeholder='Submit Name' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Date Of Birth' name='spouse.spouseDob' placeholder='Submit Dob' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Time Of Birth' name='spouse.spouseTob' placeholder='Submit Time of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' label='Place Of Birth' name='spouse.spousePob' placeholder='Submit Place of Birth' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='date' label='Anniversary' name='spouse.spouseAnniversary' placeholder='Submit Anniversary' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Mobile Number' name='spouse.spouseMobNumber' placeholder='Submit Mobile Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='email' label='Email Id' name='spouse.spouseEmail' placeholder='Submit Email Id' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='input' type='text' label='Blood Group' name='spouse.spouseBloodGroup' placeholder='Submit Blood Group' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Emergency Contact' name='spouse.spouseEmergency' placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Organization Details' name='spouse.spouseOrganization' placeholder='Please Enter Organization Details with Contact Number' />
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <FormikControl control='textarea' label='Qualifications' name='spouse.spouseQualification' placeholder='Please Enter Educational Qualifications' />
                                                </Grid>
                                            </Grid>
                                            {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                            {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Child</legend>
                                        <FieldArray name='childs'>
                                            {(ArrayHelpers) => (
                                                <div>
                                                    {formik.values.childs.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`childs-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Child-${index + 1}`}</legend>
                                                                <div className='formInput'>
                                                                    <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>

                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Name' name={`childs.[${index}].name`} placeholder='Submit Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Date Of Birth' name={`childs.[${index}].dob`} placeholder='Submit Name' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Time Of Birth' name={`childs.[${index}].tob`} placeholder='Submit Time of Birth' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' label='Place Of Birth' name={`childs.[${index}].pob`} placeholder='Submit Place of Birth' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='date' label='Anniversary' name={`childs.[${index}].anniversary`} placeholder='Submit Anniversary' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Mobile Number' name={`childs.[${index}].mobNumber`} placeholder='Submit Mobile Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='email' label='Email Id' name={`childs.[${index}].email`} placeholder='Submit Email Id' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='input' type='text' label='Blood Group' name={`childs.[${index}].bloodGroup`} placeholder='Submit Blood Group' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Emergency Details' name={`childs.[${index}].emergency`} placeholder='Please Enter Emergency Contact Person Name and Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Organization Details' name={`childs.[${index}].organization`} placeholder='Please Enter Organization Details with Contact Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={3}>
                                                                            <FormikControl control='textarea' label='Qualifications' name={`childs.[${index}].qualification`} placeholder='Please Enter Educational Qualifications' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={12} md={3}>
                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </fieldset>
                                                        </div>
                                                    ))}
                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.childs[0])}>Add Child</Button>

                                                    {/* <FormikControl control='input' type='text' label='Name' name='userName' placeholder='Submit Name' />
                                    <FormikControl control='input' type='text' label='Date Of Birth' name='userDob' placeholder='Submit Dob' />
                                    <FormikControl control='input' type='text' label='Time Of Birth' name='userTob' placeholder='Submit Time of Birth' />
                                    <FormikControl control='input' type='text' label='Place Of Birth' name='userPob' placeholder='Place of Birth' />
                                    <FormikControl control='input' type='text' label='Anniversary' name='userAnniversary' placeholder='Submit Anniversary' />
                                    <FormikControl control='input' type='text' label='Mobile Number' name='userMobile' placeholder='Submit Mobile Number' />
                                    <FormikControl control='input' type='email' label='Email Id' name='userEmail' placeholder='Submit Email Id' />
                                    <FormikControl control='input' type='text' label='Blood Group' name='userBloodGroup' placeholder='Submit Blood Group' />
                                    <FormikControl control='textarea' label='Emergency Contact Details' name='userEmergency' placeholder='Emergency Contact Details' />
                                    <FormikControl control='textarea' label='Organization Contact Details' name='userOrganization' placeholder='Organization Contact Details' />
                                    <FormikControl control='textarea' label='Educational Qualifications' name='qualification' placeholder='Educational Qualification' />     */}

                                                    {/* <FormikControl control='date' label='Date of Birth' name='dob' placeholder='Date of Birth' /> */}
                                                    {/* <FormikControl control='textarea' label='Address' name='address' placeholder='Submit Address' /> */}


                                                </div>
                                            )}
                                        </FieldArray>
                                    </fieldset>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }} >Submit</Button>
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

export default NewUser