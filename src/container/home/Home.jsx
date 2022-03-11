import React from 'react'
import { Typography } from '@mui/material';

const Home = () => {

    const reactVersion = React.version;

    return (
        <div>
            <Typography color='primary' variant='h4' textAlign='center' m={5}>Home Page</Typography>
            <Typography color='primary' variant='h5' textAlign='center' m={5}>Using React Version "{reactVersion}"</Typography>
            {/* <div className='divcont'>
                <div>
                       <h2> dasfljadskfalskdfjadsfjklladfslkjaldfsjdsf
                        adfadsfkjaldsf
                        afdskjalfjdadsf
                        adsflkjlkajadsf
                        adfsjkjlkjladf
                        lkasdfkjladf
                        adfskjlkljadsf
                        </h2>
                </div>
                <div>
                div
                </div>
                <div>
                div
                </div>
            </div>             */}
        </div>
    )
}

export default Home
