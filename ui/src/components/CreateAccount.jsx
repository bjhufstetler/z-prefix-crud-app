import { TextField, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import { CRUD } from '../crud';
import { useFetch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useAppContext, useUpdateAppContext } from '../context';
//import bcrypt from 'bcryptjs';

export const CreateAccount = () => {
    const navigate = useNavigate();
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const users = useFetch(appContext.userURL);
    const [account, setAccount] = useState({username: '', first: '', last: '', password: ''});
    const [duplicateUsername, setDuplicateUsername] = useState(false);
    const handleChange = (value, target) => {
        let tmp = {...account};
        tmp[target] = value;
        setAccount(tmp);
        if(target === 'username'){
            users.data.map(user => user.username).indexOf(value) > -1 ?
                setDuplicateUsername(true) : setDuplicateUsername(false)
        }
    }
    const handleCreate = () => {
        if(!duplicateUsername && account.username !=='' && account.password !== '' && account.first !== '' && account.last !== ''){
            //const salt = bcrypt.genSaltSync(10);
            //const hash = bcrypt.hashSync(account.password, salt)
            const salt = 'abcdef';
            const hash = account.password + salt;
            const tmp = {...account, password: hash, salt: salt};
            CRUD({method: 'POST', path: appContext.userURL, data: tmp})
            setAppContext({...appContext, username: account.username, loggedIn: true})
            navigate('/')   
        }
        
    }
    return(
        <>
            <Paper>
            <TextField
                id='first'
                label="First Name:"
                variant='filled'
                value={account.first}
                onChange={e => handleChange(e.target.value, 'first')}
                />
            <TextField
                id='last'
                label="Last Name:"
                variant='filled'
                value={account.last}
                onChange={e => handleChange(e.target.value, 'last')}
                />
            {duplicateUsername ? 
                <TextField
                    error
                    id='username'
                    label="Username:"
                    variant='filled'
                    value={account.username}
                    onChange={e => handleChange(e.target.value, 'username')}
                    helperText='Username already taken'
                    />
                : 
                <TextField
                    id='username'
                    label="Username:"
                    variant='filled'
                    value={account.username}
                    onChange={e => handleChange(e.target.value, 'username')}
                    />  
            }
            <TextField
                id='password'
                label="Password:"
                variant='filled'
                value={account.password}
                onChange={e => handleChange(e.target.value, 'password')}
                />
            <Button variant='contained' onClick={e => handleCreate(e)}>Create</Button>
            </Paper>
        </>
    )
}