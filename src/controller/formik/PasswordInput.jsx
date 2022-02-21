import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TextField } from 'formik-mui';

function PasswordInput(props) {
    const { label, name, placeholder, type, ...rest } = props;
    return (

        <div>
            {/* <label htmlFor={name}>{label}</label> */}
            <Field
                fullWidth
                component={TextField}
                variant="outlined"
                type="password"
                name={name}
                label={label}
                placeholder={placeholder}
                {...rest}
            />
            {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
        </div>

    )
}

export default PasswordInput
