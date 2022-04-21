import React from 'react';
import CheckBox from './CheckBox';
import DateInput from './DateInput';
import DateSelect from './DateSelect';
import EmailInput from './EmailInput';
import Input from './Input';
import PasswordInput from './PasswordInput';
import Selectbox from './Select';
import Textarea from './Textarea';
import Hidden from './Hidden';
import FileUpload from './FileUpload';


function FormikControl(props) {
    const { control, ...rest } = props
    switch (control) {
        case 'input': return <Input {...rest} />
        case 'textarea': return <Textarea {...rest} />
        case 'select': return <Selectbox {...rest}/>
        case 'email': return <EmailInput {...rest}/>
        case 'password': return <PasswordInput {...rest}/>
        case 'radio':
        case 'checkbox': return <CheckBox {...rest} />
        case 'hidden': return <Hidden {...rest} />
        // case 'dateinput': return <DateInput {...rest}/>
        case 'date': return <DateSelect {...rest}/>
        case 'fileupload': return <FileUpload {...rest}/>
        default: return null
    }

}

export default FormikControl
