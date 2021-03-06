import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper, CircularProgress } from '@mui/material';
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

const AmcsWarranty = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "AMC | Warranty";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, [])

    const dropDownOption = [{
        docLoc: [{
            val: 'personalWill',
            key: 'Personal Will',
        },
        {
            val: 'spousesWill',
            key: 'Spouse\'s Will',
        },
        {
            val: 'insurancePolicies',
            key: 'Insurance Policies',
        },
        {
            val: 'investPapers',
            key: 'Invest. Papers',
        },
        {
            val: 'propertyRecords',
            key: 'Property Records',
        },
        {
            val: 'birthCertificate',
            key: 'Birth Certificate',
        },
        {
            val: 'marriageCertificate',
            key: 'Marriage Certificate',
        },
        {
            val: 'domicileCertificate',
            key: 'Domicile Certificate',
        },
        {
            val: 'importantAgreements',
            key: 'Important Agreements',
        },
        {
            val: 'otherPapers',
            key: 'Other Papers',
        },
        {
            val: 'educationalCertificates',
            key: 'Educational Certificates',
        },
        ],
    }]

    const initialValues = {
        sessionToken: '',
        rId: '',
        amcsWarranty: [{
            productsModel: '',
            company: '',
            dateOfPurchase: '',
            purchaseValue: '',
            validUpto: '',
            amcRefNo: '',
            // remarks:'',
        }]
    };

    const getParam = 'getamcswarranties';
    const deleteParam = 'deleteamcswarranties';
    const updateParam = 'updateamcswarranties';

      
    const dataColumn = [{
          field: 'productsModel',
          headerName: 'Product Model',
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
            field: 'dateOfPurchase',
            headerName: 'Purchase Date',
            width: 110,
            editable: true,
            type: 'date',          
        },
        {
          field: 'purchaseValue',
          headerName: 'Purchase Value',
          width: 110,
          editable: true,
          type: 'number'          
        },
        {
            field: 'validUpto',
            headerName: 'Valid Upto',
            width: 110,
            editable: true,
            type: 'date',
          },
          {
            field: 'amcRefNo',
            headerName: 'AMC Ref No',
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

    const validationSchema = Yup.object({
        amcsWarranty: Yup.array(Yup.object({
            productsModel: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            company: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            dateOfPurchase: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            purchaseValue: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Amount!'),
            validUpto: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            amcRefNo: Yup.string().required('Mandatory Field!').min(5, 'Invalid Value!'),
        }))
    });



    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addamcswarranties`,
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                toast.info('Details Submited Successfully! ',{
                    position: toast.POSITION.TOP_CENTER,
                });             
            }, (error) => {
                console.log("error :", error);
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

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Amc's and Warranties</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Amc's & Warranties</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='amcsWarranty'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { amcsWarranty } = values;
                                            return (
                                                <div className='arrayInputs'>
                                                    {amcsWarranty.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`amcWarranty-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Amcs and Warranties-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Product' name={`amcsWarranty[${index}].productsModel`} placeholder='Submit Product and Model' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Company' name={`amcsWarranty[${index}].company`} placeholder='Submit Company' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Date of Purchase' name={`amcsWarranty[${index}].dateOfPurchase`} placeholder='Date of Purchase' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Purchase Value' name={`amcsWarranty[${index}].purchaseValue`} placeholder='Submit Purchase Value' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='date' label='Valid Upto' name={`amcsWarranty[${index}].validUpto`} placeholder='Submit Warranty/AMC valid upto' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Reference No.' name={`amcsWarranty[${index}].amcRefNo`} placeholder='Submit AMC Reference Number' />
                                                                    </Grid>

                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Remarks' name={`amcsWarranty[${index}].remarks`} placeholder='Submit Remarks' />
                                                                    </Grid> */}
                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Name' name={`amcsWarranty[${index}].docName`} placeholder='Submit Document Name' options={dropDownOption[0].docLoc} />
                                                                    </Grid> */}
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.amcsWarranty[0])} >Add More</Button>



                                                </div>
                                            )
                                        }}
                                    </FieldArray>
                                </div>
                                <Button
                                    type='submit'
                                    style={{ textAlign: 'center', margin: '8px 0px' }}
                                    variant='contained'
                                    color='primary'
                                    startIcon={formik.isSubmitting ? <CircularProgress size='1rem' /> : undefined}
                                    disabled={!formik.isValid || formik.isSubmitting}
                                    onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }}
                                    >
                                    {formik.isSubmitting ? 'Submitting' : 'Submit'}
                   
                                </Button>


                                {/* <Button type='submit' style={{ textAlign: 'center', margin: '8px 0px' }} variant='contained' color='primary' disabled={!formik.isValid || formik.isSubmitting} onClick={() => { formik.setFieldValue("sessionToken", token); formik.setFieldValue("rId", userId); }}>Submit</Button> */}
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

export default AmcsWarranty
