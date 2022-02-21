import { Person } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import {styled} from '@mui/material'
// import styled from '@emotion/styled';


const TestCode = () => {

    // const MyThemeComponent = styled.div`
    //     color: red;
    //     background-color : yellow;
    // width: 100vw;
    // `;
    // const MyThemeComponents = styled.button`
    //     color: red;
    //     background-color : yellow;
    // width: 100vw;
    // `;
    const MyThemeComponent = styled('div')(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: 'blue',
        padding: '1rem',
        borderRadius: theme.shape.borderRadius,
      }));

    return (
        <div>
            {/* <MyThemeComponent> */}
                <MyThemeComponent
                    // color='primary'
                    // size='large'
                    // variant='contained'
                    // startIcon={<Person />}
                >
                    Material Ui
                </MyThemeComponent>
            {/* </MyThemeComponent> */}
        </div>
    )
}

export default TestCode
