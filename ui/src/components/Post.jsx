import React, { useState } from 'react';
import { useAppContext } from '../context';
import { TextField, Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { CRUD } from '../crud';

import styled from '@emotion/styled';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />
  })(({ theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
  }));

export const Post = ( props ) => {
    const post = props.post;
    let subPost = {...post};
    delete subPost['user']
    const appContext = useAppContext();
    const [expanded, setExpanded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [postEdit, setPostEdit] = useState(subPost)
    const [deleted, setDeleted] = useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleDelete = () => {
        CRUD({method: 'DELETE', path: 'http://localhost:8080/api/post', data:post})
        setDeleted(true)
    }
    const handleEditClick = () => {
        if(editMode) setPostEdit({...post})
        setEditMode(!editMode)
    }
    const handlePostEdit = (value, target) => {
        let tmp = {...postEdit};
        tmp[target] = value
        setPostEdit(tmp)
    }
    const handleSaveClick = () => {
        CRUD({method: 'PATCH', path: 'http://localhost:8080/api/post', data: postEdit})
        setEditMode(false)
    }

    return(
        <Card variant='outlined'>
            <CardHeader
                avatar={editMode ? <TextField value={postEdit.title} onChange={e => handlePostEdit(e.target.value, 'title')}/> : postEdit.title}
                title={`@${post.user.username} - ${post.user.first} ${post.user.last}`}
                subheader={post.timestamp}
                action={appContext.username === post.user.username ? 
                    deleted ? 
                        <Typography sx={{color: 'red'}}>
                            Deleted
                        </Typography>
                        :
                        <>
                            <IconButton onClick={() => handleEditClick()}>
                                <EditIcon />
                            </IconButton>
                            {editMode ?
                                <IconButton onClick={() => handleSaveClick()}>
                                    <SaveIcon />
                                </IconButton>
                                : <></>
                            }
                            <IconButton onClick={() => handleDelete()}>
                                <DeleteIcon sx={{color: 'red'}}/>
                            </IconButton>
                        </> : <></>}
                />
            <CardContent>
                {editMode ? 
                    <TextField value={postEdit.content} onChange={e => handlePostEdit(e.target.value, 'content')}/>
                    :
                    <Typography>
                    {expanded ? postEdit.content : `${postEdit.content.slice(0, 100)} ${postEdit.content.length > 100 ? '...' : ''}`}
                    </Typography>
                }
            </CardContent>
            <CardActions>
                <ExpandMore
                expand={expanded}
                onClick={e => handleExpandClick(e)}>
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
        </Card>
    )
};