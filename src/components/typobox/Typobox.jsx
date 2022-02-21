import { Box, Typography } from '@mui/material'
import { purple, red, blue } from '@mui/material/colors';
import React from 'react'

const Typobox = (props) => {
    const {typocontent, typosize} = props;
    const colorblue = blue[50];

    return (
        <div>
            <Box component='nav' bgcolor="primary.main" px={1}>
            <Typography color={colorblue} variant={typosize} textAlign='center'>{typocontent}</Typography>
            </Box>
        </div>
    )
}

export default Typobox
