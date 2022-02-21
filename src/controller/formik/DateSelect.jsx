import React from 'react';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
import { TextField } from 'formik-mui';
import { DatePicker, DateTimePicker, TimePicker } from 'formik-mui-lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns'; 
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box } from '@mui/material';
import './DateSelect.css'

function DateSelect(props) {
    const {label, name, placeholder, ...rest}=props
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className='controlWrap datewidth'>
            {/* <label htmlFor={name}>{label}</label> */}
            <Field 
            fullWidth
            name={name} 
            component={DatePicker}
            label={label}     
            placeholder={placeholder}       
            textField={{variant: 'outlined'}}
            />
            {/* <ErrorMessage name={name} component={ErrorMsg}/> */}
        </div>
        </LocalizationProvider>
    )
}


export default DateSelect
