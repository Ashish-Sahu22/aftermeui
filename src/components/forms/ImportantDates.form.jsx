import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper } from '@mui/material';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import FormikControl from '../../controller/formik/FormikControl';
import { regex, months } from '../../constant/regexconstant'
import '../../controller/formik/formikcontrol.css';
import { Link } from 'react-router-dom';
import '../new-user/newuser.css';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuItem from '@mui/material/MenuItem';
import GetList from '../userlist/GetList';
import { toast } from 'react-toastify';
import base_url from '../../constant/Bootapi';

const ImportantDates = () => {

    const [userRegister, setUserRegister] = useState({})
    const [monthData, setMonthData] = useState({ months });

    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "Important Dates";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallimportantdatedetails';
    const deleteParam = 'deleteimportantdate';
    const updateParam = 'updateimportantdate';

      
    const dataColumn = [{
          field: 'name',
          headerName: 'Name',
          width: 110,
          editable: true,
        },
        {
          field: 'date',
          headerName: 'Date',
          width: 110,
          editable: true,
          type: 'date',
        },
        {
            field: 'event',
            headerName: 'Event',
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
        eventdates: [{
            name: '',
            date: '',
            event: '',
        }]
    }

    const validationSchema = Yup.object({
        eventdates: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            date: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            event: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {

        await axios.post(`${base_url}/api/addimportantdate`,
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
        console.log(data);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Typography color='primary' sx={{ textAlign: 'center' }} variant='h4'>Important Dates</Typography>
                {
                    months.map((monthData, monthindex, montharray) => (
                        <div key={monthindex}>
                            <Paper elevation={6} style={{ padding: 40, margin: '40px 10px 0px 10px' }}>
                            <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                                <Typography color='primary' variant='h5'>{monthData}</Typography>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {formik => {
                                        return <Form>

                                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Land Line Details</Typography></legend> */}

                                            <div className='formInputs'>
                                                <FieldArray name='eventdates'>
                                                    {ArrayHelpers => {
                                                        const { push, remove, form } = ArrayHelpers;
                                                        const { values } = form;
                                                        const { eventdates } = values;
                                                        return (
                                                            <div style={{ marginBottom: "2rem" }}>
                                                                {eventdates.map((dataItem, index, array) => (
                                                                    <div className='childsInputs' key={`${monthData}-${index}`}>
                                                                        <Paper variant="outlined" style={{ padding: 20, margin: '10px 0px 20px 0px' }}>
                                                                            {/* <fieldset>
                                                                        <legend>{`${monthData}-${index + 1}`}</legend> */}
                                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                                <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                                <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='textarea' label='House Detail' name={`eventdates[${index}].houseDetails`} placeholder='Submit House Details' />
                                                                            </Grid> */}

                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Select Meter' name={`eventdates[${index}].meter`} placeholder='Submit Document Name' options={dropDownOption[0].meter} />
                                                                    </Grid> */}


                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='date' label='Date' name={`eventdates[${index}].date`} placeholder='Select Date' />
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='input' label='Events' name={`eventdates[${index}].event`} placeholder='Submit Events(Birthday/Anniversary/Others' />
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} md={4}>
                                                                                    <FormikControl control='input' label='Name' name={`eventdates[${index}].name`} placeholder='Submit Name' />
                                                                                </Grid>
                                                                                {/* <Grid item xs={12} sm={6} md={4}>
                                                                                <FormikControl control='input' label='Deposit Amount Rs.' name={`eventdates[${index}].depositLlWifiAmt`} placeholder='Submit Deposit LL, BroadBand, Wifi Amount ' />
                                                                            </Grid> */}

                                                                                {
                                                                                    array.length > 1 &&
                                                                                    <Grid item xs={12} sm={12} md={12}>
                                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => remove(index)}>Remove</Button>

                                                                                    </Grid>
                                                                                }
                                                                            </Grid>
                                                                            {/* </fieldset> */}
                                                                        </Paper>
                                                                    </div>
                                                                ))}

                                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.eventdates[0])}>Add More</Button>

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
                    ))}
            </div>
        </div>

    )
}

export default ImportantDates
