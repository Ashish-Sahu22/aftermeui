import { Box, Typography, Divider } from '@mui/material'
import { purple, red, blue } from '@mui/material/colors';
import Typobox from '../typobox/Typobox';
import React from 'react'
import "./footer.css"

const Footer = () => {
    const colorblue = blue[100];

    return (
        <div className='footer'>
            <Divider />
            <Typobox typocontent='© Ayasya Digital Solution Pvt. Ltd. copyright 2021. All Rights Reserved.' />
        </div>
    )
}

export default Footer
