import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import base_url from '../../constant/Bootapi'

const settings = ['Profile', 'Account', 'Dashboard'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const log = async () => {
    localStorage.removeItem("session");
    localStorage.removeItem("id");
    window.sessionStorage.removeItem('session');
    window.sessionStorage.removeItem('id');

    await axios.post(`${base_url}/api/logoutUser`,
    // {
    //     headers:{"Access-Control-Allow-Origin": "*"}
    // }
).then((response) => {
    console.log("success", response);
      localStorage.removeItem("session");
      localStorage.removeItem("id");
      window.sessionStorage.removeItem('session');
      window.sessionStorage.removeItem('id'); 
    toast.success('Log Out Successfully',{
        position: toast.POSITION.TOP_CENTER,
    });
           
    
    // setError(response);
    navigate("login");
}, (error) => {
    console.log("error :", error);
    // setError(error.response.data);
    window.sessionStorage.setItem("error", error);
    // setError(error.data);
    toast.error('Something Went Wrong! Try Again!', {
        position:toast.POSITION.TOP_CENTER})
}
)

    navigate('login');        
  };


  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: 'space-between' }}>
          <Box sx={{display: 'flex', alignItems:'center'}}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { md: 'flex' } }}
          >
            LOGO
          </Typography>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
          </Box>

          <Box >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Rajeev" src="/assets/images/loguser.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={log}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
