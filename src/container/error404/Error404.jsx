import { CssBaseline, Typography } from '@mui/material';
import React from 'react'
import { useParams } from 'react-router'

function Error404() {
    const {id} = useParams();
    return (
        <div>
           <Typography 
           color='error' 
           variant='h4' 
           align='center' 
           my={5}> Sorry! "{id}" Page Not Found... 
           </Typography>
        </div>
    )
}

export default Error404
