import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import { TextField } from 'formik-mui';


function Textarea(props) {
    const { name, label, placeholder, helperText, ...rest } = props;
    return (

        <div>
            {/* <label htmlFor={name}>{label}</label> */}
            <Field
                multiline
                fullWidth
                helperText={helperText}
                maxRows={1}
                component={TextField}
                id="outlined-textarea"
                variant="outlined"
                name={name}
                label={label}
                placeholder={placeholder}
                {...rest} />
            {/* <TextField
                id="outlined-textarea"
                label={label}
                placeholder={placeholder}
                multiline
          {...rest}
        /> */}
            {/* <ErrorMessage name={name} component={ErrorMsg} /> */}
        </div>

    )
}

export default Textarea
