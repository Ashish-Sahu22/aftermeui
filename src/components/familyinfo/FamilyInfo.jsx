import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
// import * as actions from '../../../../store/actions/index';
import { Button, IconButton, Typography } from '@mui/material';

import * as yup from "yup";
// import moment from 'moment';
import { CardBox } from '../cardbox/Cardbox';
// import { getInputElement } from '../../constant/UtilityForm';
// import { PATH_SELLER_CONSTANT } from '../../../../../../../../constants/path/seller.constant';

const InitialState = {
    dateOfBirth: '',
    gender: '',
    dateOfJoining: '',
    maritalStatus: '',
    offEmail: '',
    altEmail: '',
    number: '',
    altNumber: '',
    localAddress: {
        address: '',
        city: '',
        state: '',
        pincode: ''
    },
    permanentAddress: {
        address: '',
        city: '',
        state: '',
        pincode: ''
    },
    spouse: {
        name: '',
        occupation: '',
        industry: '',
        dateofBirth: '',
        anniversaryDate: ''
    },
    child: [{
        name: '',
        dateOfBirth: ''
    }],
    parents: {
        father: {
            name: '',
            occupation: '',
            industry: '',
            number: ''
        },
        mother: {
            name: '',
            occupation: '',
            industry: '',
            number: ''
        }
    },
    siblings: [{
        name: '',
        relation: '',
        occupation: '',
        industry: '',
        number: ''
    }],

    resignDate: '',
    lastWorkingDate: '',
    newOrgName: '',
    newOrgCTC: '',
    newNumber: ''
}

const gender = [
    { key: 'male', value: 'Male' },
    { key: 'female', value: 'Female' }
]

const mStatus = [
    { key: 'married', value: 'Married' },
    { key: 'unmarried', value: 'Unmarried' }
]

const UserDetail = (props) => {
    const submitProduct = (data) => {

    }
    return (
        <div className="container my-3">
            <CardBox>
                <div className="p-4">
                    <Formik
                        initialValues={{ ...InitialState }}
                        // validationSchema={validationScheme}
                        onSubmit={(data) => submitProduct(data)}
                    >
                        {
                            ({ values,
                                handleReset,
                                isValid,
                                dirty
                            }) => <Form className="form-container">
                                    <div className="row">
                                        <div className="col-12 mb-2 mt-5">
                                            <h6 className="col-12 mb-2 heading">
                                                Personal Info
                                            </h6>
                                        </div>
                                        <div className="col-12">
                                            {getInputElement('dateOfJoining', 'Date Of Joining', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, 'Select Date')}
                                        </div>

                                        <div className="col-12 col-md-6 pl-md-4">
                                            <div className="custom-btn-radio">
                                                {getInputElement('gender', 'Gender', 'radio', null, gender, true, '')}
                                            </div>
                                        </div>

                                        <div className="col-12 col-md-6 pl-md-4">
                                            <div className="custom-btn-radio">
                                                {getInputElement('maritalStatus', 'Marital Status', 'radio', null, mStatus, true, '')}
                                            </div>
                                        </div>
                                        <div className="col-12 m-2">
                                            Contact Info
                                        </div>
                                        <div className="col-12 col-md-6 pr-md-4">
                                            {getInputElement('offEmail', 'Official Email', 'email', null, false, true, 'Enter Email')}
                                        </div>
                                        <div className="col-12 col-md-6 pl-md-4">
                                            {getInputElement('altEmail', 'Personal Email', 'email', null, false, true, 'Enter email')}
                                        </div>

                                        <div className="col-12 col-md-6 pr-md-4">
                                            {getInputElement('number', 'Phone Number', 'number', null, false, true, 'Enter mobile number')}
                                        </div>
                                        <div className="col-12 col-md-6 pl-md-4">
                                            {getInputElement('altNumber', 'Alternate Phone Number', 'number', null, false, true, 'Enter mobile number')}
                                        </div>


                                        <div className="col-12 m-2">
                                            Addresses
                                        </div>
                                        <div className="col-12">
                                            <div className="col-12 m-2">
                                                Permanent Address Info
                                            </div>
                                            <div className="col-12">
                                                {getInputElement('permanentAddress.address', 'Address', 'textarea', null, false, true, '')}
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-md-6">
                                                    {getInputElement('permanentAddress.city', 'City', 'text', null, false, true, 'Enter City Name')}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    {getInputElement('permanentAddress.state', 'State', 'select', null, gender, true, 'Select State')}
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    {getInputElement('permanentAddress.pincode', 'Pincode', 'text', null, false, true, 'Enter Pincode')}
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-2 mt-5">
                                            <h6 className="col-12 m-2 heading">
                                                Family Details
                                            </h6>
                                            <hr />
                                        </div>
                                        <div className="col-12 m-2">
                                            Spouse
                                        </div>
                                        <div className="col-12 col-md-4">
                                            {getInputElement('spouse.name', 'Name', 'text', null, false, true, 'Enter Name')}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            {getInputElement('spouse.occupation', 'Occupation', 'text', null, false, true, 'Enter occupation')}
                                        </div>

                                        <div className="col-12 col-md-4">
                                            {getInputElement('spouse.industry', 'Industry', 'text', null, false, true, 'Enter Industry')}
                                        </div>

                                        <div className="col-12 col-md-4">
                                            {getInputElement('spouse.dateOfBirth', 'Date Of Birth', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, 'Enter date')}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            {getInputElement('spouse.anniversaryDate', 'Anniversary Date', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, 'Enter date')}
                                        </div>
                                        <div className="col-12 m-2">
                                            Child
                                        </div>
                                        <div className="col-12">
                                            <FieldArray name="child">{
                                                (ArrayHelpers) => (
                                                    <div className="container-fluid border py-3 my-2">
                                                        {
                                                            values.child.map((data, index, array) => (
                                                                <div className="row" key={"children-" + index}>
                                                                    <div className="col-1 text-right pt-4">
                                                                        <p>{index + 1}</p>
                                                                    </div>
                                                                    <div className="col-5">
                                                                        {getInputElement('child.' + index + '.name', "Child Name", 'text', null, null, true, 'Enter name')}
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {getInputElement('child.' + index + '.dateOfBirth', "Child Date Of Birth ", 'date', null, {
                                                                            "singleDatePicker": true,
                                                                            "autoApply": true,
                                                                            "showDropdowns": true,
                                                                            "drops": "auto",
                                                                            "endDate": moment(),
                                                                        }, true, 'Enter date of birth')}
                                                                    </div>

                                                                    <div className="col-1 text-left">
                                                                        {
                                                                            array.length > 1 &&
                                                                            <div className="mx-2 pt-4">
                                                                                <IconButton aria-label="Delete project" title="Delete project" className="text-danger p-2" size="small"
                                                                                    onClick={() => ArrayHelpers.remove(index)}>
                                                                                    <i className="material-icons">delete_outline</i>
                                                                                </IconButton>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                        <div className="button_group justify-content-end border-top pt-3 mt-3">
                                                            <Button className="button button_prev"
                                                                aria-label="Add more project"
                                                                title="Add more project"
                                                                size="small"
                                                                type="button"
                                                                onClick={() => ArrayHelpers.push(InitialState.child[0])}
                                                            > Add Slabs <i className="ml-1 material-icons">add</i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            }</FieldArray>
                                        </div>

                                        <div className="col-12 m-2">
                                            Parents
                                        </div>

                                        <div className="col-12 m-2 pl-2">
                                            Father
                                        </div>
                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.father.name', 'Name', 'text', null, false, true, 'Enter Name')}
                                        </div>
                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.father.occupation', 'Occupation', 'text', null, false, true, 'Enter occupation')}
                                        </div>

                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.father.industry', 'Industry', 'text', null, false, true, 'Enter Industry')}
                                        </div>

                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.father.number', 'Date Of Birth', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, 'Enter Mobile Number')}
                                        </div>

                                        <div className="col-12 m-2">
                                            Mother
                                        </div>
                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.mother.name', 'Name', 'text', null, false, true, 'Enter Name')}
                                        </div>
                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.mother.occupation', 'Occupation', 'text', null, false, true, 'Enter occupation')}
                                        </div>

                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.mother.industry', 'Industry', 'text', null, false, true, 'Enter Industry')}
                                        </div>

                                        <div className="col-12 col-md-3">
                                            {getInputElement('parents.mother.number', 'Date Of Birth', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, 'Enter Mobile Number')}
                                        </div>
                                        <div className="col-12 m-2">
                                            Siblings
                                        </div>
                                        <div className="col-12">
                                            <FieldArray name="siblings">{
                                                (ArrayHelpers) => (
                                                    <div className="container-fluid border py-3 my-2">
                                                        {
                                                            values.child.map((data, index, array) => (
                                                                <div className="row" key={"siblings-" + index}>
                                                                    <div className="col-1 text-right pt-4">
                                                                        <p>{index + 1}</p>
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {getInputElement('siblings.' + index + '.name', "Name", 'text', null, null, true, 'Enter name')}
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {getInputElement('siblings.' + index + '.relation', "Relation", 'text', null, null, true, 'Enter relation')}
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {getInputElement('siblings.' + index + '.occupation', "Occupation", 'text', null, null, true, 'Enter occupation')}
                                                                    </div>
                                                                    <div className="col-2">
                                                                        {getInputElement('siblings.' + index + '.industry', "Industry", 'text', null, null, true, 'Enter industry')}
                                                                    </div>

                                                                    <div className="col-2">
                                                                        {getInputElement('siblings.' + index + '.mobile', "Mobile", 'number', null, null, true, 'Enter mobile')}
                                                                    </div>


                                                                    <div className="col-1 text-left">
                                                                        {
                                                                            array.length > 1 &&
                                                                            <div className="mx-2 pt-4">
                                                                                <IconButton aria-label="Delete project" title="Delete project" className="text-danger p-2" size="small"
                                                                                    onClick={() => ArrayHelpers.remove(index)}>
                                                                                    <i className="material-icons">delete_outline</i>
                                                                                </IconButton>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }

                                                        <div className="button_group justify-content-end border-top pt-3 mt-3">
                                                            <Button className="button button_prev"
                                                                aria-label="Add more project"
                                                                title="Add more project"
                                                                size="small"
                                                                type="button"
                                                                onClick={() => ArrayHelpers.push(InitialState.siblings[0])}
                                                            > Add Slabs<i className="ml-1 material-icons">add</i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            }</FieldArray>
                                        </div>






                                    </div>
                                    <div className="row">
                                        <div className="col-12 mb-2 mt-5">
                                            <h6 className="col-12 mb-2 heading">
                                                Other Details
                                            </h6>
                                            <hr />
                                        </div>

                                        <div className="col-12 col-md-4">
                                            {getInputElement('resignDate', 'Resignation Date', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, '')}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            {getInputElement('lastWorkingDate', 'Last Working Date', 'date', null, {
                                                "singleDatePicker": true,
                                                "autoApply": true,
                                                "showDropdowns": true,
                                                "drops": "auto",
                                                "endDate": moment(),
                                            }, true, '')}
                                        </div>

                                        <div className="col-12 col-md-4">
                                            {getInputElement('newOrgName', 'New Organisation Name', 'text', null, false, true, 'Enter Industry')}
                                        </div>

                                        <div className="col-12 col-md-4">
                                            {getInputElement('newOrgCTC', 'New Organisation CTC', 'number', null, false, true, 'Enter date')}
                                        </div>
                                        <div className="col-12 col-md-4">
                                            {getInputElement('newNumber', 'Any New Number', 'number', null, false, true, 'Enter date')}
                                        </div>







                                    </div>
                                    <div className="col-12">
                                        <div className="btn-group mt-2">
                                            <Button className="mr-3 p-2 pr-4 pl-4 text-white" disabled={!(isValid && dirty)} type="submit" color="primary" variant="contained">
                                                Create Now
                                            </Button>
                                            <Button className="mr-3 p-2 pr-4 pl-4" type="reset" color="primary" variant="outlined">
                                                Reset
                                            </Button>
                                        </div>
                                    </div>

                                </Form>
                        }
                    </Formik>
                </div>
            </CardBox>
        </div>
    )
}

export default UserDetail;
