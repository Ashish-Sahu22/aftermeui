import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TextField } from 'formik-mui';

function DateInput(props) {
    const { label, name, ...rest } = props;
    return (

        <div>
            {/* <label htmlFor={name}>{label}</label> */}
            <Field fullWidth component={TextField}
                InputLabelProps={{
                    shrink: true,
                }}
                // defaultValue="2017-05-24"
                variant="outlined"
                type='date'
                name={name}
                label={label}
                {...rest} />
            <ErrorMessage name={name} component={ErrorMsg} />
        </div>

    )
}

export default DateInput
