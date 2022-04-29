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

const HouseDetails = () => {

    const [userRegister, setUserRegister] = useState({});
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState();

    useEffect(() => {
        document.title = "House Details";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));
    }, []);

    const getParam = 'getallhousepropertydetails';
    const deleteParam = 'deletehouseproperty';
    const updateParam = 'updatehouseproperty';

      
    const dataColumn = [{
          field: 'name',
          headerName: 'Account Name',
          width: 110,
          editable: true,
        },
        {
          field: 'detail',
          headerName: 'Bank Name',
          width: 110,
          editable: true,
        },
        {
            field: 'howAcquired',
            headerName: 'Account No',
            width: 110,
            editable: true,
          },
        {
          field: 'loanAmt',
          headerName: 'Branch',
          width: 110,
          editable: true,
        },
        {
            field: 'installment',
            headerName: 'Ifsc Code',
            width: 110,
            editable: true,
          },
          {
            field: 'registrationNo',
            headerName: 'Account Type',
            width: 110,
            editable: true,
          },
          {
            field: 'shareCertificate',
            headerName: 'Certificate',
            width: 110,
            editable: true,
          },
          {
            field: 'propertyCardNo',
            headerName: 'Property Card Number',
            width: 110,
            editable: true,
          },
          {
            field: 'houseTax.houseTaxPayable',
            headerName: 'House Tax Payable',
            width: 110,
            editable: true,
          },
          {
            field: 'houseTax.censusNo',
            headerName: 'Census Number',
            width: 110,
            editable: true,
          },
          {
            field: 'houseTax.propertyIdentificationNo',
            headerName: 'Property Id Number',
            width: 110,
            editable: true,
          },
          {
            field: 'houseTax.constructionArea',
            headerName: 'Construction Area',
            width: 110,
            editable: true,
          },
          {
            field: 'houseTax.dueDate',
            headerName: 'Due Date',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceProp.insuranceCompany',
            headerName: 'Insurance Company',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceProp.sumInsured',
            headerName: 'Sum Insured',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceProp.premiumAmount',
            headerName: 'Premium Amount',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceProp.policyRenewalDate',
            headerName: 'Policy Renewal Date',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceProp.riskCovered',
            headerName: 'Risk Covered',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceLifeOfBorrower.insuranceCompany',
            headerName: 'Insurance Company',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceLifeOfBorrower.sumInsured',
            headerName: 'Sum Insured',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceLifeOfBorrower.premiumAmount',
            headerName: 'Premium Amount',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceLifeOfBorrower.policyRenewalDate',
            headerName: 'Policy Renewal Date',
            width: 110,
            editable: true,
          },
          {
            field: 'houseInsuranceLifeOfBorrower.riskCovered',
            headerName: 'riskCovered',
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
        houseDetails: [{
            name: '',
            detail: '',
            howAcquired: '',
            loanAmt: '',
            installment: '',
            registrationNo: '',
            shareCertificate: '',
            propertyCardNo: '',
            houseTax: {
                houseTaxPayable: '',
                censusNo: '',
                propertyIdentificationNo: '',
                constructionArea: '',
                dueDate: '',
            },
            houseInsuranceProp: {
                insuranceCompany: '',
                sumInsured: '',
                premiumAmount: '',
                policyRenewalDate: '',
                riskCovered: ''
            },
            houseInsuranceLifeOfBorrower: {
                insuranceCompany: '',
                sumInsured: '',
                premiumAmount: '',
                policyRenewalDate: '',
                riskCovered: ''
            },

        }]
    }

    const validationSchema = Yup.object({
        houseDetails: Yup.array(Yup.object({
            name: Yup.string().required('Mandatory Field!').min(3, 'Invalid Name!'),
            detail: Yup.string().required('Mandatory Field!').min(8, 'Invalid Number!'),
            howAcquired: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            loanAmt: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
            installment: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
            registrationNo: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            shareCertificate: Yup.string().required('Mandatory Field!').min(8, 'Invalid Input!'),
            propertyCardNo: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            houseTax: Yup.object({
                houseTaxPayable: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                censusNo: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                propertyIdentificationNo: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                constructionArea: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                dueDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
            }),
            houseInsuranceProp: Yup.object({
                insuranceCompany: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                sumInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
                premiumAmount: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
                policyRenewalDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
                riskCovered: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            }),

            houseInsuranceLifeOfBorrower: Yup.object({
                insuranceCompany: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
                sumInsured: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
                premiumAmount: Yup.string().required('Mandatory Field!').matches(regex.amount, 'Invalid Input'),
                policyRenewalDate: Yup.date().required('Mandatory Field!').typeError('Invalid Input!'),
                riskCovered: Yup.string().required('Mandatory Field!').min(5, 'Invalid Input!'),
            }),

        }))
    });

    const onSubmit = async (values, onSubmitProps) => {
        await axios.post(`${base_url}/api/addhousepropertydetails`,
            values,
            // {
            //     headers:{"Access-Control-Allow-Origin": "*"}
            // }
        ).then(
            (response) => {
                console.log("success", response);
                toast.success('Details Submited Successfully! ',{
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
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>House Property Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>
                                <div className='formInput'>
                                    <FieldArray name='houseDetails'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { houseDetails } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {houseDetails.map((childData, index, array) => (
                                                        <div className='childsInputs' key={`houseDetails-${index}`}>
                                                            <fieldset>
                                                                <legend>{`House-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }} style={{ marginBottom: '24px' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />

                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Name' name={`houseDetails[${index}].name`} placeholder='Submit Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='Property Detail' name={`houseDetails[${index}].detail`} placeholder='Submit Property Detail' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' type='text' label='How acquired' name={`houseDetails[${index}].howAcquired`} placeholder='How acquired (Inherited/Loan)' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Loan Amount' name={`houseDetails[${index}].loanAmt`} placeholder='Submit Loan Amount Rs.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Installment' name={`houseDetails[${index}].installment`} placeholder='Submit Installment Rs.' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Registration Number' name={`houseDetails[${index}].registrationNo`} placeholder='Submit Registration Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Share Certificate' name={`houseDetails[${index}].shareCertificate`} placeholder='Submit Share Certificate' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Property Card Number' name={`houseDetails[${index}].propertyCardNo`} placeholder='Submit Property Card Number' />
                                                                    </Grid>
                                                                </Grid>

                                                                <fieldset style={{ marginBottom: '24px' }} >
                                                                    <legend>{"House Tax Details"}</legend>
                                                                    <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='House Tax Payable' name={`houseDetails[${index}].houseTax.houseTaxPayable`} placeholder='Submit House Tax Payable Rs.' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Census Number' name={`houseDetails[${index}].houseTax.censusNo`} placeholder='Submit Census Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Property Identification Number' name={`houseDetails[${index}].houseTax.propertyIdentificationNo`} placeholder='Submit Property Identification Number' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Construction Area' name={`houseDetails[${index}].houseTax.constructionArea`} placeholder='Submit Construction Area, Sq. Meters' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='date' label='House Tax Due Date' name={`houseDetails[${index}].houseTax.dueDate`} placeholder='Submit Due Date Of House Tax' />
                                                                        </Grid>
                                                                    </Grid>
                                                                </fieldset>

                                                                <fieldset style={{ marginBottom: '24px' }}>
                                                                    <legend>{"House Insurance (Property)"}</legend>
                                                                    <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Insurance Company' name={`houseDetails[${index}].houseInsuranceProp.insuranceCompany`} placeholder='Submit Insurance Company' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Sum Insured' name={`houseDetails[${index}].houseInsuranceProp.sumInsured`} placeholder='Submit Sum Insured' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Premium Amount' name={`houseDetails[${index}].houseInsuranceProp.premiumAmount`} placeholder='Submit Premium Amount' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='date' label='Policy Renewal Date' name={`houseDetails[${index}].houseInsuranceProp.policyRenewalDate`} placeholder='Submit Policy Renewal Date' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Risk Covered' name={`houseDetails[${index}].houseInsuranceProp.riskCovered`} placeholder='Submit Risk Covered' />
                                                                        </Grid>
                                                                    </Grid>
                                                                </fieldset>

                                                                <fieldset style={{ marginBottom: '24px' }}>
                                                                    <legend>{"House Insurance (Life Of Borrower)"}</legend>
                                                                    <Grid container item spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Insurance Company' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.insuranceCompany`} placeholder='Submit Insurance Company' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Sum Insured' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.sumInsured`} placeholder='Submit Sum Insured' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Premium Amount' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.premiumAmount`} placeholder='Submit Premium Amount' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='date' label='Policy Renewal Date' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.policyRenewalDate`} placeholder='Submit Policy Renewal Date' />
                                                                        </Grid>
                                                                        <Grid item xs={12} sm={6} md={4}>
                                                                            <FormikControl control='input' label='Risk Covered' name={`houseDetails[${index}].houseInsuranceLifeOfBorrower.riskCovered`} placeholder='Submit Risk Covered' />
                                                                        </Grid>
                                                                    </Grid>
                                                                </fieldset>
                                                                <Grid>
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.houseDetails[0])} >Add More</Button>



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

export default HouseDetails
