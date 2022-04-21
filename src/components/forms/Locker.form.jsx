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

const Locker = () => {

    const [userRegister, setUserRegister] = useState({})

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Locker Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getlockers';
    const deleteParam = 'deletelockers';
    const updateParam = 'updatelockers';

      
    const dataColumn = [{
          field: 'bankBranch',
          headerName: 'Bank Branch',
          width: 110,
          editable: true,
        },
        {
          field: 'lockerNo',
          headerName: 'Locker Number',
          width: 110,
          editable: true,
        },
        {
            field: 'inNameOf',
            headerName: 'In Name Of',
            width: 110,
            editable: true,
          },
        {
          field: 'code',
          headerName: 'Code',
          width: 110,
          editable: true,
        },
        {
            field: 'rent',
            headerName: 'Rent',
            width: 110,
            editable: true,
          },
          {
            field: 'rentRenewalDate',
            headerName: 'Rent Renewal Date',
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
            field: 'contents',
            headerName: 'Contents',
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
        locker: [{
            bankBranch: '',
            lockerNo: '',
            inNameOf: '',
            code: '',
            rent: '',
            rentRenewalDate: '',
            nominee: '',
            contents: '',
        }]
    }

    const validationSchema = Yup.object({
        locker: Yup.array(Yup.object({
            bankBranch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            lockerNo: Yup.string().required('Mandatory Field!').min(4, 'Invalid Input!'),
            inNameOf: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            code: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            rent: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            rentRenewalDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            nominee: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            contents: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        }))    
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addlockers", 
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
                // navigate('/login')           
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Lockers</Typography>

                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => {
                        return <Form>

                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Lockers</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='locker'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { locker } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {locker.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`locker-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Locker-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Bank Details' name={`locker[${index}].bankBranch`} placeholder='Submit Bank and Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Locker Number' name={`locker[${index}].lockerNo`} placeholder='Submit Locker Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name Of' name={`locker[${index}].inNameOf`} placeholder='Submit In the Name Of' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Code' name={`locker[${index}].code`} placeholder='Submit Code' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Rent' name={`locker[${index}].rent`} placeholder='Submit Rent (Rs)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Rent Renewal Date' name={`locker[${index}].rentRenewalDate`} placeholder='Submit Rent Renewal Date' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Nominee' name={`locker[${index}].nominee`} placeholder='Submit Nominee Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Contents' name={`locker[${index}].contents`} placeholder='Submit Contents' />
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.locker[0])}>Add More</Button>



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

export default Locker
