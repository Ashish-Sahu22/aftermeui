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

const PersonClose = () => {

    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Close Person";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getclosetome';
    const deleteParam = 'deleteclosetome';
    const updateParam = 'updateclosetome';
    
    
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'relation',
          headerName: 'Relation',
          width: 110,
          editable: true,
        },
        {
            field: 'address',
            headerName: 'Address',
            width: 110,
            editable: true,
          },
        {
          field: 'contact',
          headerName: 'Contact',
          width: 110,
          editable: true,
        },
        {
            field: 'reasonToClose',
            headerName: 'Reason To Close',
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
        relation: [{
            val: 'father',
            key: 'Father',
        },
        {
            val: 'mother',
            key: 'Mother',
        },
        {
            val: 'sister',
            key: 'Sister',
        },
        {
            val: 'daughter',
            key: 'Daughter',
        },
        {
            val: 'son',
            key: 'Son',
        },
        {
            val: 'brother',
            key: 'brother',
        },
        {
            val: 'other',
            key: 'Other',
        },],
    }]

    const initialValues = {
        sessionToken: '',
        rId: '',
        closeToMe: [{
            name: '',
            relation: '',
            address: '',
            contact: '',
            reasonToClose: ''
        }]
    }

    const validationSchema = Yup.object({
        closeToMe: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            relation: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            address: Yup.string().required('Mandatory Field!').min(15, 'Invalid Address!'),
            contact: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number!').min(10, 'Submit 10 digits of valid mobile number!').max(10, 'Invalid Mobile Number! Submit 10 digit of Valid mobile number!'),
            reasonToClose: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addclosetome",
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                // toast.success('Your Registration Successfully Done! ',{
                //     position: toast.POSITION.TOP_CENTER,
                // });             
            }, (error) => {
                console.log("error :", error);
                // toast.error('Something Went Wrong! Try Again Sometime!', {
                //     position:toast.POSITION.TOP_CENTER})
            }
        )

        const data = JSON.stringify(values);
        console.log(values);
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Persons Close to My <FavoriteIcon fontSize='large' color='error' /></Typography>
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
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Person Close to Heart</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='closeToMe'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { closeToMe } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {closeToMe.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`closeToMe-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Person-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`closeToMe[${index}].name`} placeholder='Submit Name of Person' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Relation' name={`closeToMe[${index}].relation`} placeholder='Relation with Person' options={dropDownOption[0].relation} />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Contact Details' name={`closeToMe[${index}].contact`} placeholder='Contact Details' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Address' name={`closeToMe[${index}].address`} placeholder='Address of Person' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Reason' name={`closeToMe[${index}].reasonToClose`} placeholder='Reason for being close to my Heart' />
                                                                    </Grid>

                                                                    {
                                                                        array.length > 1 &&
                                                                        <Grid item xs={12} sm={12} md={4}>

                                                                            <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => remove(index)}>Remove</Button>

                                                                        </Grid>
                                                                    }
                                                                </Grid>
                                                            </fieldset>

                                                        </div>
                                                    ))}

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.closeToMe[0])}>Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => {formik.setFieldValue("sessionToken", token);formik.setFieldValue("rId", userId); }}>Submit</Button>
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

export default PersonClose
