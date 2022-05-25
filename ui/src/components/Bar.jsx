import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useAppContext, useUpdateAppContext } from '../context';

const settings = ['Profile', 'My Posts', 'Dashboard', 'Logout'];

export const Bar = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const loginData = useState({username: '', password: ''})
    const handleOpenUserMenu = e => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleCreateClick = () => {

    }
    const handleLoginClick = () => {

    }
    return (
        <AppBar postition='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Box sx={{flexGrow: 0 }} >
                        <IconButton onClick={e => handleOpenUserMenu(e)} sx={{ p: 0}}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px'}}
                            id='menu-appbar'
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
                                {settings.map(setting => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign='center'>{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                    </Box>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpaceing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Z BLOG
                    </Typography>
                    {!appContext.loggedIn ?
                    <>
                        <TextField
                            id='username'
                            label="Username:"
                            variant='filled'
                            value={loginData.username}/>
                        <TextField
                            id='password'
                            type='password'
                            label="Password:"
                            variant='filled'
                            value={loginData.password}/>
                        <Button 
                            variant='contained'
                            onClick={handleLoginClick}>
                            Login
                        </Button>
                        <Typography
                            sx={{
                                marginLeft: '10px',
                                textDecoration: 'underline'
                            }}
                            onClick={handleCreateClick}
                        >
                            Create New Account
                        </Typography>
                    </>: <></>}
                </Toolbar>
            </Container>
        </AppBar>
    )

}