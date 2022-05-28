import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Container } from '@mui/system';
import React, { useState } from 'react';
import { useFetch } from '../hooks';
import { useAppContext, useUpdateAppContext } from '../context';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

export const Bar = () => {
    const navigate = useNavigate();
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const settings = appContext.username === '' ? ['Login Required'] : ['Create New Post', 'My Posts', 'Dashboard', 'Logout'];
    const {data: users} = useFetch('users')
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [loginData, setLoginData] = useState({username: '', password: ''})
    
    const handleOpenUserMenu = e => {
        setAnchorElUser(e.currentTarget);
    };
    const handleCloseUserMenu = (setting = '') => {
        setAnchorElUser(null);
        if(setting === 'Logout') { 
            setAppContext({...appContext, username: '', loggedIn: false})
            navigate('/', { replace: true }, [navigate])
        } else if (setting === 'My Posts') {
            navigate(`/user/${appContext.username}`, { replace: true }, [navigate])
        } else if (setting === 'Dashboard') {
            navigate('/', { replace: true }, [navigate])
        } else if (setting === 'Create New Post') {
            navigate('/newpost', { replace: true }, [navigate])
        }

    };
    const handleLoginClick = () => {
        const userFound = users.filter(user => user.username === loginData.username)[0]
        let userAuth = false;
        if ( userFound ) {
            const user = users.filter(user => user.username === loginData.username)[0]
            const hash = user.password;
            const salt = user.salt;
            const authHash = bcrypt.hashSync(loginData.password, salt);
            userAuth = authHash === hash; 
        }
        userAuth ? setAppContext({...appContext, username: loginData.username, loggedIn: true}) : setLoginData({...loginData, password: ''})
        navigate('/', { replace: true }, [navigate])
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