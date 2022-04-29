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


const IdDetails = () => {

    const [userRegister, setUserRegister] = useState({});

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Id Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getalldocument';
    const deleteParam = 'deletedocument';
    const updateParam = 'updatedocument';

      
    const dataColumn = [{
          field: 'documentType',
          headerName: 'Document Type',
          width: 110,
          editable: true,
        },
        {
          field: 'Bearer',
          headerName: 'bearer',
          width: 110,
          editable: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            width: 110,
            editable: true,
          },
        {
          field: 'idNo',
          headerName: 'ID No',
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
            field: 'file',
            headerName: 'File',
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
        documentType: [{
            val: 'passport',
            key: 'Passport',
        },
        {
            val: 'drivinglic',
            key: 'Driving Licence',
        },
        {
            val: 'vehicleRc',
            key: 'Vehicle RC',
        },
        {
            val: 'panCard',
            key: 'PAN Card',
        },
        {
            val: 'adharCard',
            key: 'Adhar Card',
        },
        {
            val: 'voterIdCard',
            key: 'Voter Id Card',
        },
        {
            val: 'other',
            key: 'Other',
        },
        {
            val: 'clubMembership',
            key: 'Club Membership',
        },
        ],
        bearer: [{
            val: 'self',
            key: 'Self',
        },
        {
            val: 'spouse',
            key: 'Spouse',
        },
        {
            val: 'child',
            key: 'Child',
        }],
    }]

    const initialValues = {
        sessionToken: '',
        rId: '',
        idDetail: [{
            documentType: '',
            bearer: '',
            name: '',
            idNo: '',
            expiryDate: '',
            file: '',
        }]
    }

    const validationSchema = Yup.object({
        idDetail: Yup.array(Yup.object({
            documentType: Yup.string().required('Mandatory Field!').min(4, 'Invalid Name!'),
            bearer: Yup.string().required('Mandatory Field!').min(4, 'Invalid Input!'),
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            idNo: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            expiryDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        formData.append('file', values.file)
        await axios.post(`${base_url}/api/adddocument`,
        formData,
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
        // const data = JSON.stringify(values);
        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Documents Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Documents Details</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='idDetail'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { idDetail } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {idDetail.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`idDetail-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Id Detail-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Type' name={`idDetail[${index}].documentType`} placeholder='Submit Document Type' options={dropDownOption[0].documentType} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Bearer' name={`idDetail[${index}].bearer`} placeholder='Document Bearer Person' options={dropDownOption[0].bearer} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`idDetail[${index}].name`} placeholder='Submit Bearer Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Id Number' name={`idDetail[${index}].idNo`} placeholder='Submit Document Number' />
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Expiry Date' name={`idDetail[${index}].expiryDate`} placeholder='Submit Expiry Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        {/* <FormikControl control='fileupload' label='Document Upload' name={`idDetail[${index}].file`} /> */}
                                                                        {/* <input 
                                                                            type="file"
                                                                            name={`idDetail[${index}].file`}
                                                                            onChange={(event)=>{
                                                                            formik.setFieldValue("file", event.target.files[0]);
                                                                            }}
                                                                        /> */}
                                                                        <input 
                                                                            type="file" 
                                                                            name={`idDetail[${index}].file`} 
                                                                            onChange={(event)=>formik.setFieldValue(`idDetail[${index}].file`, event.target.files[0])}
                                                                            encType="multipart/form-data"
                                                                            />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.idDetail[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button 
                                type='submit' 
                                style={{ textAlign: 'center', margin: '8px 0px' }} 
                                variant='contained' color='primary' 
                                // disabled={!formik.isValid || formik.isSubmitting} 
                                onClick={() => { formik.setFieldValue("sessionToken", token); 
                                formik.setFieldValue("rId", userId); 
                                }}>Submit</Button>
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

export default IdDetails
