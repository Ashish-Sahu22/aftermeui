import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
// import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { TextField } from 'formik-mui';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const Selectbox = (props) => {
    const { label, name, placeholder, type, options, ...rest } = props;

    return (
        <div>
            {/* <label htmlFor={name}>{label}</label> */}

            <Field select component={TextField}
                variant="outlined"
                fullWidth
                name={name}
                placeholder={placeholder}
                label={label}
                {...rest} >
                {options.map(option => (
                    <MenuItem key={option.val} value={option.val}>
                        {option.key}
                    </MenuItem>
                    // <option key={option.val} value={option.val}>{option.labels}</option>
                ))}
            </Field>
            {/* <ErrorMessage name={name} component={ErrorMsg} /> */}

        </div>
    )
}

export default Selectbox
