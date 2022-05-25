import { TextField, Paper, Button } from '@mui/material';
import React, { useState } from 'react';
import { CRUD } from '../crud';
import { useFetch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useUpdateAppContext } from '../context';

export const CreateAccount = () => {
    const navigate = useNavigate();
    const setAppContext = useUpdateAppContext();
    const users = useFetch('http://localhost:8080/api/users');
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
        console.log('start')
        if(!duplicateUsername && account.username !=='' && account.password !== '' && account.first !== '' && account.last !== ''){
            CRUD({method: 'POST', path: 'http://localhost:8080/api/users', data: account})
            console.log('middle')
            setAppContext({username: account.username, loggedIn: true})
            navigate('/')
            
        }
        console.log('end')
        
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