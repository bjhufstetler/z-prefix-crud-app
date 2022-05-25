import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useFetch } from '../hooks';
import { useAppContext, useUpdateAppContext } from '../context';
import { Link } from 'react-router-dom';


export const Bar = () => {
    const appContext = useAppContext();
    const settings = appContext.username === '' ? ['Login Required'] : ['Create New Post', 'My Posts', 'Dashboard', 'Logout'];
    const setAppContext = useUpdateAppContext();
    const {data: users} = useFetch('http://localhost:8080/api/users')
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loginData, setLoginData] = useState({username: '', password: ''})
    
    const handleOpenUserMenu = e => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = (setting = '') => {
        setAnchorElUser(null);
        console.log(setting)
        if(setting === 'Logout') { 
            setAppContext({username: '', loggedIn: false})
            console.log('logging out')
        }
    };
    const handleLoginClick = () => {
        const userFound = users.filter(user => user.username === loginData.username)[0]
        userFound ? setAppContext({username: loginData.username, loggedIn: true}) : setLoginData({...loginData, password: ''})
    }
    const handleLoginChange = (value, target) => {
        let tmpLogin = {...loginData}
        tmpLogin[target] = value
        setLoginData(tmpLogin)
    }
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-between'}}>
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
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={e => handleCloseUserMenu(e)}
                            >
                                {settings.map(setting => (
                                    <MenuItem key={setting} onClick={e => handleCloseUserMenu(setting)}>
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
                            value={loginData.username}
                            onChange={e => handleLoginChange(e.target.value, 'username')}
                            />
                        <TextField
                            id='password'
                            type='password'
                            label="Password:"
                            variant='filled'
                            value={loginData.password}
                            onChange={e => handleLoginChange(e.target.value, 'password')}
                            />
                        <Button 
                            variant='contained'
                            onClick={handleLoginClick}>
                            Login
                        </Button>
                        <Link to='/create'>
                            Create New Account
                        </Link>
                    </>: <>{`@${appContext.username}`}</>}
                </Toolbar>
            </Container>
        </AppBar>
    )

}