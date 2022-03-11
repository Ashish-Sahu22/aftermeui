import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper } from '@mui/material';
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
import { margin, padding } from '@mui/system';

// import { GridToolbarDensitySelector } from '@material-ui/data-grid';
// import { toast } from 'react-toastify';


function MedicalHistory() {

    useEffect(() => {
        document.title = "Registration";
    }, [])

    const [userRegister, setUserRegister] = useState({})

    const initialValues = {
        me: [{
            vaccName: '',
            vaccDate: '',
            allergicMedicines: '',
            metallicImplant: '',
            lifeSaveMed: '',
        }],
        spouse: [{
            vaccName: '',
            vaccDate: '',
            allergicMedicines: '',
            metallicImplant: '',
            lifeSaveMed: '',
        }],
        childs: [{
            vaccName: '',
            vaccDate: '',
            allergicMedicines: '',
            metallicImplant: '',
            lifeSaveMed: '',
        }],
    }

    const validationSchema = Yup.object({
        
        me: Yup.array(Yup.object({
            vaccName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            vaccDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            allergicMedicines: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            metallicImplant: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
            lifeSaveMed: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
           })),
   
           spouse: Yup.array(Yup.object({
               vaccName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               vaccDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
               allergicMedicines: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               metallicImplant: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               lifeSaveMed: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
              })),
   
           childs: Yup.array(Yup.object({
               vaccName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               vaccDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
               allergicMedicines: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               metallicImplant: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
               lifeSaveMed: Yup.string().required('Mandatory Field!').min(3, 'Invalid Input!'),
              }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        const data = JSON.stringify(values);
        console.log(data);
        console.log(values);
        onSubmitProps.setSubmitting(false);
        onSubmitProps.resetForm();
    };


    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>
            <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Medical History Details</Typography>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {formik => {
                        return <Form>

                            {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Medical History</Typography></legend> */}

                                <div className='formInputs'>

                                    <FieldArray name='me'>
                                        {(ArrayHelpers) => (
                                            <div style={{ marginBottom: "2rem" }}>
                                                {formik.values.me.map((childData, index, array) => (
                                                    <div className='childsInputs' key={`myMedicalHistory-${index}`}>
                                                        <fieldset>
                                                            <legend>{`Medical History-${index + 1}`}</legend>
                                                            <fieldset style={{ marginBottom: '24px', padding: '16px' }}>
                                                                <legend>{"Vaccination"}</legend>
                                                                <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} xs={12}>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`me.[${index}].vaccName`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control="date" label='Date' name={`me.[${index}].vaccDate`} placeholder='Submit Date' />
                                                                    </Grid>
                                                                </Grid>
                                                            </fieldset>
                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Allergic Reaction to medicines' name={`me.[${index}].allergicMedicines`} placeholder='Allergic Medicines' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Metallic Implant' name={`me.[${index}].metallicImplant`} placeholder='Metallic Implant' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='textarea' label='Life Saving Medicine' name={`me.[${index}].lifeSaveMed`} placeholder='Taking Any Life Saving Medicine(s). Dosage/Symptoms/SOS' />
                                                                </Grid>

                                                                <Grid item xs={12} sm={12} md={6}>
                                                                    {
                                                                        array.length > 1 &&
                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>
                                                                    }
                                                                </Grid>

                                                            </Grid>
                                                        </fieldset>

                                                    </div>
                                                ))}

                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.me[0])}>Add More</Button>



                                            </div>
                                        )}
                                    </FieldArray>

                                    <FieldArray name='spouse'>
                                        {(ArrayHelpers) => (
                                            <div style={{ marginBottom: "2rem" }}>
                                                {formik.values.spouse.map((arrData, index, array) => (
                                                    <div className='childsInputs' key={`spouseMedicalHistory-${index}`}>
                                                        <fieldset>
                                                            <legend>{`Spouse Medical History-${index + 1}`}</legend>
                                                            <fieldset style={{ marginBottom: '24px', padding: '16px' }}>
                                                                <legend>{"Vaccination"}</legend>
                                                                <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} xs={12}>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`spouse.[${index}].vaccName`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control="date" label='Date' name={`spouse.[${index}].vaccDate`} placeholder='Submit Date' />
                                                                    </Grid>
                                                                </Grid>
                                                            </fieldset>
                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Allergic Reaction to medicines' name={`spouse.[${index}].allergicMedicines`} placeholder='Allergic Medicines' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Metallic Implant' name={`spouse.[${index}].metallicImplant`} placeholder='Metallic Implant' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='textarea' label='Life Saving Medicine' name={`spouse.[${index}].lifeSaveMed`} placeholder='Taking Any Life Saving Medicine(s). Dosage/Symptoms/SOS' />
                                                                </Grid>

                                                                <Grid item xs={12} sm={12} md={6}>
                                                                    {
                                                                        array.length > 1 &&
                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>
                                                                    }
                                                                </Grid>

                                                            </Grid>
                                                        </fieldset>

                                                    </div>
                                                ))}

                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.me[0])}>Add More</Button>



                                            </div>
                                        )}
                                    </FieldArray>

                                    <FieldArray name='childs'>
                                        {(ArrayHelpers) => (
                                            <div style={{ marginBottom: "2rem" }}>
                                                {formik.values.childs.map((arrData, index, array) => (
                                                    <div className='childsInputs' key={`childMedicalHistory-${index}`}>
                                                        <fieldset>
                                                            <legend>{`Child Medical History-${index + 1}`}</legend>
                                                            <fieldset style={{ marginBottom: '24px', padding: '16px' }}>
                                                                <legend>{"Vaccination"}</legend>
                                                                <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} xs={12}>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`childs.[${index}].vaccName`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={6}>
                                                                        <FormikControl control="date" label='Date' name={`childs.[${index}].vaccDate`} placeholder='Submit Date' />
                                                                    </Grid>
                                                                </Grid>
                                                            </fieldset>
                                                            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Allergic Reaction to medicines' name={`childs.[${index}].allergicMedicines`} placeholder='Allergic Medicines' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='input' type='text' label='Metallic Implant' name={`childs.[${index}].metallicImplant`} placeholder='Metallic Implant' />
                                                                </Grid>
                                                                <Grid item xs={12} sm={6} md={6}>
                                                                    <FormikControl control='textarea' label='Life Saving Medicine' name={`childs.[${index}].lifeSaveMed`} placeholder='Taking Any Life Saving Medicine(s). Dosage/Symptoms/SOS' />
                                                                </Grid>
                                                                {
                                                                    array.length > 1 &&
                                                                    <Grid item xs={12} sm={12} md={6}>

                                                                        <Button variant='outlined' color='error' style={{ minWidth: '90px', margin: 'auto', float: 'right' }} onClick={() => ArrayHelpers.remove(index)}>Remove</Button>

                                                                    </Grid>
                                                                }
                                                            </Grid>
                                                        </fieldset>

                                                    </div>
                                                ))}

                                                <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => ArrayHelpers.push(initialValues.me[0])}>Add More</Button>



                                            </div>
                                        )}
                                    </FieldArray>



                                </div>


                                <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting}>Submit</Button>
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

export default MedicalHistory