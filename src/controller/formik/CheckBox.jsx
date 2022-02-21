import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import ErrorMsg from './ErrorMsg';
import { Checkbox, TextField } from 'formik-mui';

function CheckBox(props) {
    const { label, name, placeholder, options, ...rest } = props;
    return (

        <div>
            {/* <label htmlFor={name}>{label}</label> */}
            {
                options.map((checkboxOptions, index, array) => (
                    <label key={index}>
                        <Field
                            type="checkbox"
                            component={Checkbox}
                            name="attorney.executedFor"
                            value={checkboxOptions.val}
                            name={name}
                        />
                        {checkboxOptions.key}
                    </label>

                ))}
            <ErrorMessage name={name} component={ErrorMsg} />
        </div>

    )
}

export default CheckBox
