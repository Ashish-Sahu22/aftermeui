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

const PANCardDetails = () => {

    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "PAN Card Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getPanCardDetails';
    const deleteParam = 'deletePanCard';
    const updateParam = 'updatePanCard';
    
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'patriarch',
          headerName: 'Patriarch',
          width: 110,
          editable: true,
        },
        {
            field: 'cardNo',
            headerName: 'Card No',
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
            field: 'phoneNo',
            headerName: 'Phone Number',
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
        panCard: [{
            name: '',
            patriarch: '',
            cardNo: '',
            issueDate: '',
            phoneNo: '',
        }]
    }

    const validationSchema = Yup.object({
        // panCard: Yup.array(Yup.object({
        //     name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
        //     patriarch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
        //     cardNo: Yup.string().required('Mandatory Field!').matches(regex.pan, 'Invalid Input'),
        //     issueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
        //     phoneNo: Yup.string().required('Mandatory Field!').matches(regex.mobile, 'Invalid Number'),
        //     }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        const token = window.sessionStorage.getItem('token');
        console.log('usertoken :',token)
        await axios.post("http://1634-60-254-104-154.ngrok.io/afterme/api/addPanCard",
        values,
        { 
            headers: {
                "Content-Type":"application/json",
                "token": token
            } 
        }
    ).then(
        (response) => {
            console.log("success", response);
            console.log("success", response.headers.token);
            console.log("token", token);
            // toast.success('Your Registration Successfully Done! ',{
            //     position: toast.POSITION.TOP_CENTER,
            // });             
        }, (error) => {
            console.log("error :", error);
            console.log("success", error.headers.token);
            console.log("token", token);
            // toast.error('Something Went Wrong! Try Again Sometime!', {
            //     position:toast.POSITION.TOP_CENTER})
        }
    )
        const data = JSON.stringify(values);
        console.log("token", token);
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>PAN Card Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>PAN Cards</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='panCard'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { panCard } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {panCard.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`panCard-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Card-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`panCard[${index}].name`} placeholder='Submit Card Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Patriarch Name' name={`panCard[${index}].patriarch`} placeholder='Submit Father/Husband Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='PAN Number' name={`panCard[${index}].cardNo`} placeholder='Submit PAN Card Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='PAN Issue Date ' name={`panCard[${index}].issueDate`} placeholder='Submit Valid From' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Phone Number' name={`panCard[${index}].phoneNo`} placeholder='Submit Linked Phone Number' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.panCard[0])}>Add More</Button>



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

export default PANCardDetails
