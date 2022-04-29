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

const DrivingLicence = () => {
    const [userRegister, setUserRegister] = useState({});

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Driving Licence";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getdrivinglicences';
    const deleteParam = 'deletedrivinglicence';
    const updateParam = 'updatedrivinglicence';

      
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'licenceNo',
          headerName: 'Licence Number',
          width: 110,
          editable: true,
        },
        {
            field: 'authority',
            headerName: 'Authority',
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
            field: 'validFrom',
            headerName: 'Valid From',
            width: 110,
            editable: true,
          },
          {
            field: 'validTill',
            headerName: 'Valid Till',
            width: 110,
            editable: true,
          },
          {
            field: 'remarksBloodGroup',
            headerName: 'Remark/BloodGrouo',
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
        drivingLicence: [{
            name: '',
            licenceNo: '',
            authority: '',
            issueDate: '',
            validFrom: '',
            validTill: '',
            remarksBloodGroup: '',
        }]
    }

    const validationSchema = Yup.object({
        drivingLicence: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            licenceNo: Yup.string().required('Mandatory Field!').min(15, 'Invalid Input!'),
            authority: Yup.string().required('Mandatory Field!').min(15, 'Invalid Authority!'),
            issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            validFrom: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            validTill: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            remarksBloodGroup: Yup.string().required('Mandatory Field!').matches(regex.bloodgroup, 'Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/adddrivinglicence`,
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then((response) => {
            console.log("success", response);
            toast.success('Details Submited Successfully! ',{
                position: toast.POSITION.TOP_CENTER,
            });       
            // setError(response);
        }, (error) => {
            console.log("error :", error);
            // setError(error.data);
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
                   
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Driving Licence Details</Typography>
                   
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Driving Licence Details</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='drivingLicence'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { drivingLicence } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {drivingLicence.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`drivingLicence-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Licence-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`drivingLicence[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Licence No.' name={`drivingLicence[${index}].licenceNo`} placeholder='Submit Licence Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Authority' name={`drivingLicence[${index}].authority`} placeholder='Submit Licence Authority' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Issue Date/CDOI' name={`drivingLicence[${index}].issueDate`} placeholder='Submit Issue Date/ CDOI' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid From' name={`drivingLicence[${index}].validFrom`} placeholder='Submit Valid From' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid Till' name={`drivingLicence[${index}].validTill`} placeholder='Submit Valid Till' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Blood Group' name={`drivingLicence[${index}].remarksBloodGroup`} placeholder='Submit Remarks/BloodGroup' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.drivingLicence[0])}>Add More</Button>



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

export default DrivingLicence
