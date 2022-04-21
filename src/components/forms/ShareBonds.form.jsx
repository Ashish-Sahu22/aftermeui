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

const ShareBonds = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Shares | Bonds";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getsharesbonds';
    const deleteParam = 'deletesharesbonds';
    const updateParam = 'updatesharesbonds';
    
    const dataColumn = [
        {
          field: 'depositoryDetails',
          headerName: 'Depository Details',
          width: 110,
          editable: true,
        },
        {
          field: 'dematAccNumber',
          headerName: 'Demat Account Number',
          width: 110,
          editable: true,
        },
        {
            field: 'modeOfOperation',
            headerName: 'Mode of Operation',
            width: 110,
            editable: true,
          },
        {
          field: 'nominee',
          headerName: 'Nominee',
          width: 110,
          editable: true,
        },
        {
            field: 'company',
            headerName: 'Company',
            width: 110,
            editable: true,
          },
          {
            field: 'numberOfShares',
            headerName: 'Number Of Shares',
            width: 110,
            editable: true,
          },
          {
            field: 'dematStatementLocation',
            headerName: 'Demat Satement Location',
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
        shareBonds: [{
            depositoryDetails: '',
            dematAccNumber: '',
            modeOfOperation: '',
            nominee: '',
            company: '',
            numberOfShares: '',
            dematStatementLocation: '',
        }]
    }

    const validationSchema = Yup.object({
        shareBonds: Yup.array(Yup.object({
            depositoryDetails: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            dematAccNumber: Yup.string().required('Mandatory Field!').matches(regex.re16digit, 'Invalid Input!'),
            modeOfOperation: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            nominee: Yup.string().required('Mandatory Field').min(3, "Invalid Name!"),
            company: Yup.string().required('Mandatory Field!').min(3,'Invalid Input!'),
            numberOfShares: Yup.number().required('Mandatory Field!').typeError("Invalid Input!").min(1,'Invalid Input'),
            dematStatementLocation: Yup.string().required('Mandatory Field!').min(4, 'Invalid Input'),
        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addsharesbonds",
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
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Shares/Units/Debentures/Bonds</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>


                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Deposits</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='shareBonds'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { shareBonds } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {shareBonds.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`deposits-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Share/Bond-${index + 1}`}</legend>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' type='text' label='Depository Details' name={`shareBonds[${index}].depositoryDetails`} placeholder='Submit Depository Details' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Demat Account Number' name={`shareBonds[${index}].dematAccNumber`} placeholder='Submit Demat Account Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control="input" type='text' label='Mode of Operation' name={`shareBonds[${index}].modeOfOperation`} placeholder='Submit Mode Of Operation' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Nominee' name={`shareBonds[${index}].nominee`} placeholder='Submit Nominee Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Company' name={`shareBonds[${index}].company`} placeholder='Submit Company' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Number Of Shares' name={`shareBonds[${index}].numberOfShares`} placeholder='Submit Number of Shares' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Demat Statement Location' name={`shareBonds[${index}].dematStatementLocation`} placeholder='Submit Demat Statement Location' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.shareBonds[0])}>Add More</Button>



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

export default ShareBonds
