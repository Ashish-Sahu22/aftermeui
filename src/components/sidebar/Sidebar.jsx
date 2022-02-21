import { Home } from '@mui/icons-material';
import { display, flexbox } from '@mui/lab/node_modules/@mui/system';
import { Container, Typography, styled, CssBaseline, Divider } from '@mui/material';
import React from 'react';
import NavData from '../../data/navdata.json';
import { Link } from 'react-router-dom';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
// import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

// import { styled } from '@mui/system';


const Sidebar = () => {
    const Drawer = styled('div')(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        paddingTop: theme.spacing(2),
        height: '100%',
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(2),
        },
    }));

    const DrawerItem = styled('div')(({ theme }) => ({
        display: 'flex',
        margin: theme.spacing(1),
        cursor: 'pointer',
        flexWrap:'nowrap',
        alignItems: 'center',
    }));
    const DrawerIcon = styled('div')(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(1),

        }
    }));
    const DrawerText = styled('div')(({ theme }) => ({
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('md')]: {
            display: 'none',
            visibility: 'hidden',
        }
    }));


    return (
        <>
            {/* <CssBaseline /> */}
            <Divider />
            <Drawer>
                <Link to='/' style={{ textDecoration: "none" }} >
                    <DrawerItem>
                        <DrawerIcon>
                            <HomeRoundedIcon />
                        </DrawerIcon>
                        <DrawerText>
                            <Typography > Home </Typography>
                        </DrawerText>
                    </DrawerItem>
                </Link>
                <Link to='user' style={{ textDecoration: "none" }} >
                    <DrawerItem>
                        <DrawerIcon>
                            <AccountCircleIcon />
                        </DrawerIcon>
                        <DrawerText>
                            <Typography > User Account</Typography>
                        </DrawerText>
                    </DrawerItem>
                </Link>
                <Link to='admin' style={{ textDecoration: "none" }} >
                    <DrawerItem>
                        <DrawerIcon>
                            <AdminPanelSettingsIcon />
                        </DrawerIcon>
                        <DrawerText>
                            <Typography > Administrator </Typography>
                        </DrawerText>
                    </DrawerItem>
                </Link>
                <Link to='settings' style={{ textDecoration: "none" }} >
                    <DrawerItem>
                        <DrawerIcon>
                            <SettingsIcon />
                        </DrawerIcon>
                        <DrawerText>
                            <Typography > Settings </Typography>
                        </DrawerText>
                    </DrawerItem>
                </Link>
                <Link to='mail' style={{ textDecoration: "none" }} >
                    <DrawerItem>
                        <DrawerIcon>
                            <EmailIcon />
                        </DrawerIcon>
                        <DrawerText>
                            <Typography > Mailbox </Typography>
                        </DrawerText>
                    </DrawerItem>
                </Link>
                <Divider />

                {NavData.map((data, index) => (
                    <Link to={data.link} style={{ textDecoration: "none" }} >
                        <DrawerItem>
                            <DrawerIcon>
                                <AppRegistrationRoundedIcon />
                            </DrawerIcon>
                            <DrawerText>
                                <Typography > {data.text} </Typography>
                            </DrawerText>
                        </DrawerItem>
                    </Link>
                ))}

                <Divider/>


            </Drawer>
        </>
    )
}

export default Sidebar
