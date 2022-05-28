import { TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context';
import { useFetch } from '../hooks';
import { CRUD } from '../crud';
import { useNavigate } from 'react-router-dom';

export const NewPost = () => {
    const navigate = useNavigate();
    const appContext = useAppContext();
    const users = useFetch(appContext.userURL);
    const [newPost, setNewPost] = useState({title: '', content:''});
    useEffect(() => {
        let user_id = null;
        if(users.load) {
            user_id = users.data.filter(x => x.username === appContext.username)[0].id
            setNewPost({...newPost, user_id})
        }
    }, [users.load]);
    const handleChange = (value, target) => {
        let tmp = {...newPost};
        tmp[target] = value;
        setNewPost(tmp)
    }
    const handleSubmit = () => {
        const currentDate = new Date();
        let tmp = {...newPost, timestamp: currentDate};
        CRUD({method: 'POST', path: appContext.postURL, data: tmp})
        navigate('/', { replace: true }, [navigate])
    }
    return (
        <>
            <TextField 
                label='Title'
                sx={{
                    width: '100%',
                    marginTop: '15px',
                    marginLeft: '15px'
                }}
                value={newPost.title}
                onChange={e => handleChange(e.target.value, 'title')}/>
            <br></br>
            <TextField 
                label='Content'
                sx={{
                    width: '100%',
                    marginTop: '15px',
                    marginLeft: '15px'
                }}
                multiline
                rows={20}
                value={newPost.content}
                onChange={e => handleChange(e.target.value, 'content')}/>
            <br></br>
            <Button 
                sx={{
                    width: '500px',
                    marginTop: '15px',
                    marginLeft: '15px'
                }}
                onClick={() => handleSubmit()}
                variant='contained'>Submit</Button>
        </>
    )
}