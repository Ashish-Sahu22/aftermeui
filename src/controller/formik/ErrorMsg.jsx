import React from 'react';
import './errormsg.css';

function ErrorMsg(props) {
    return (
        <div className='ErrorMsg'>
            {props.children}
        </div>
    )
}

export default ErrorMsg
