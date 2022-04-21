import React, { useEffect, useState } from 'react'
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import { Box, Grid } from '@mui/material';
import ResponsiveDrawer from '../../components/drawer/ResponsiveDrawer';
import { Container, Typography, styled, Divider } from '@mui/material';


const Main = () => {
    const navigate = useNavigate();
    const [userExist, setUserExist] = useState(true);

    useEffect(() => {
        document.title = "Home";
        const storageToken = window.sessionStorage.getItem('session');
        const storageUserId = window.sessionStorage.getItem('id');

        const session = localStorage.getItem("session");
        const userId = localStorage.getItem("id");

        if(storageToken==null && storageUserId==null){
            localStorage.removeItem("session");
            localStorage.removeItem("id");
            navigate('/login');
            setUserExist(false);
        }
        
        // if (session == null && userId == null) {
        //     navigate('/login');
        //     setUserExist(false);
        // }
    }, [])

    return (<>
        {/* <ResponsiveDrawer/> */}
        {/* <Link to='testcode' >Test-Code</Link> */}
        <Navbar />
        <Grid container flexWrap='nowrap'>
            <Grid item md={3} lg={2.5} xl={2} >
                <Sidebar />
            </Grid>
            <Grid item md={9} lg={9.5} xl={10}>
                <Outlet />
            </Grid>
        </Grid>
        <Footer />
    </>
    )
}

export default Main