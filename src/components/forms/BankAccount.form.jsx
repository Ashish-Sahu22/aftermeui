import React, { useEffect, useState } from 'react';
import { Button, Grid, IconButton, Typography, Paper, Icon } from '@mui/material';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BankAccount = () => {

    const [data, setData] = useState([]);
    const [userRegister, setUserRegister] = useState({})
    const [token, setToken] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        document.title = "Bank Account";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = localStorage.getItem('id'); 
        setToken(JSON.parse(storageToken));
        setUserId(JSON.parse(storageUserId));  
    }, [])
    
    const getParam = 'getbankaccount';
    const deleteParam = 'deletebankaccount';
    const updateParam = 'updatebankaccount';

      
    const dataColumn = [{
          field: 'accountName',
          headerName: 'Account Name',
          width: 110,
          editable: true,
        },
        {
          field: 'bankName',
          headerName: 'Bank Name',
          width: 110,
          editable: true,
        },
        {
            field: 'accountNo',
            headerName: 'Account No',
            width: 110,
            editable: true,
          },
        {
          field: 'branch',
          headerName: 'Branch',
          width: 110,
          editable: true,
        },
        {
            field: 'ifscCode',
            headerName: 'Ifsc Code',
            width: 110,
            editable: true,
          },
          {
            field: 'accountType',
            headerName: 'Account Type',
            width: 110,
            editable: true,
          },
          {
            field: 'operatingInst',
            headerName: 'Operating Instruction',
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
            field: 'specimenSign',
            headerName: 'Specimen Sign',
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
        bankAccount: [{
            accountName: '',
            bankName: '',
            accountNo: '',
            branch: '',
            ifscCode: '',
            accountType: '',
            operatingInst: '',
            nominee: '',
            specimenSign: ''
            // remarks:'',
        }]
    }

    const validationSchema = Yup.object({
        bankAccount: Yup.array(Yup.object({
            accountName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            bankName: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            branch: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            accountNo: Yup.string().required('Mandatory Field').matches(regex.bankAccountNo, 'Invalid Input'),
            ifscCode: Yup.string().required('Mandatory Field!').min(11, 'Invalid Value!'),
            accountType: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            operatingInst: Yup.string().required('Mandatory Field!').min(5, 'Invalid Value!'),
            nominee: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
            specimenSign: Yup.string().required('Mandatory Field!').min(3, 'Invalid Value!'),
        }))
    });


    const onSubmit = async (values, onSubmitProps) => {
        await axios.post("http://localhost:8080/afterme/api/addbankaccount",
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
        console.log(userId);
    };

    return (
        <div className='newUserWrap'>
            <div className='newUserForm'>

                <Paper elevation={6} style={{ padding: 50, margin: 20 }}>
                    <Typography color='primary' sx={{ textAlign: 'center', marginBottom: '30px' }} variant='h4'>Bank Accounts Details</Typography>
                    <GetList getParam={getParam} updateParam={updateParam} deleteParam={deleteParam} dataColumn={dataColumn}/>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {formik => {
                            return <Form>

                                {/* <fieldset>
                                <legend className='headingLegend'> <Typography variant='h5' color='primary'>Bank Accounts</Typography></legend> */}

                                <div className='formInputs'>
                                    <FieldArray name='bankAccount'>
                                        {ArrayHelpers => {
                                            const { push, remove, form } = ArrayHelpers;
                                            const { values } = form;
                                            const { bankAccount } = values;
                                            return (
                                                <div style={{ marginBottom: "2rem" }}>
                                                    {bankAccount.map((dataItem, index, array) => (
                                                        <div className='childsInputs' key={`amcWarranty-${index}`}>
                                                            <fieldset>
                                                                <legend>{`Account-${index + 1}`}</legend>
                                                                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ alignItems: 'center' }}>
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='sessionToken' defaultValue={token} values={token} value={token} />
                                                                    <FormikControl control='hidden' type='hidden' label='Name' name='rId' defaultValue={userId} values={userId} value={userId} />
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Owner Name' name={`bankAccount[${index}].accountName`} placeholder='Submit Account Holder Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Bank Name' name={`bankAccount[${index}].bankName`} placeholder='Submit Bank Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Branch' name={`bankAccount[${index}].branch`} placeholder='Submit Branch Name' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Account Number' name={`bankAccount[${index}].accountNo`} placeholder='Submit Account Number' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Ifsc Code' name={`bankAccount[${index}].ifscCode`} placeholder='Submit Ifsc Code' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Account Type' name={`bankAccount[${index}].accountType`} placeholder='Submit Type Of Account' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Operating Instructions' name={`bankAccount[${index}].operatingInst`} placeholder='Submit Operating Instructions' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Nominee' name={`bankAccount[${index}].nominee`} placeholder='Submit Nominees' />
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='input' label='Specimen Signature' name={`bankAccount[${index}].specimenSign`} placeholder='Submit Specimen Signature' />
                                                                    </Grid>

                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='textarea' label='Remarks' name={`bankAccount[${index}].remarks`} placeholder='Submit Remarks' />
                                                                    </Grid> */}
                                                                    {/* <Grid item xs={12} sm={6} md={4}>
                                                                        <FormikControl control='select' type='select' label='Document Name' name={`bankAccount[${index}].docName`} placeholder='Submit Document Name' options={dropDownOption[0].docLoc} />
                                                                    </Grid> */}
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

                                                    <Button variant='contained' color='primary' style={{ minWidth: '90px', textAlign: 'center' }} onClick={() => push(initialValues.bankAccount[0])}>Add More</Button>

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

export default BankAccount