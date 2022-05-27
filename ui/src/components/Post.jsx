import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context';
import { TextField, Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
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

export const Post = ( {post} ) => {
    const appContext = useAppContext();
    const [expanded, setExpanded] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [postEdit, setPostEdit] = useState({...post})
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        setPostEdit(post)
    }, [post])
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleDelete = () => {
        CRUD({method: 'DELETE', path: appContext.postURL, data:post})
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
        let tmp = {...postEdit};
        delete tmp['user']
        CRUD({method: 'PATCH', path: appContext.postURL, data: tmp})
        setEditMode(false)
    }

    return(
        <Card variant='outlined' sx={{backgroundColor: 'rgba(40,75,99,.5)'}}>
            <CardHeader
                avatar={editMode ? 
                    <TextField 
                        sx={{
                            width: '100%',
                            marginTop: '15px',
                            marginLeft: '15px'
                        }}
                        value={postEdit.title} 
                        onChange={e => handlePostEdit(e.target.value, 'title')}/> 
                    : postEdit.title}
                title={`@${post.user.username} - ${post.user.first} ${post.user.last}`}
                subheader={post.timestamp}
                action={appContext.username === post.user.username ? 
                    deleted ? 
                        <Typography sx={{color: 'red'}}>
                            Deleted
                        </Typography>
                        :
                        <>
                            {editMode ?
                                <>
                                    <IconButton onClick={() => handleEditClick()}>
                                        <CancelIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleSaveClick()}>
                                        <SaveIcon />
                                    </IconButton>
                                </>
                                :
                                <IconButton onClick={() => handleEditClick()}>
                                    <EditIcon />
                                </IconButton>
                            }
                            <IconButton onClick={() => handleDelete()}>
                                <DeleteIcon sx={{color: 'red'}}/>
                            </IconButton>
                        </> : <></>}
                />
            <CardContent>
                {editMode ? 
                    <TextField 
                        sx={{
                            width: '100%',
                            marginTop: '15px',
                            marginLeft: '15px'
                        }}
                        multiline
                        rows={20}
                        value={postEdit.content} 
                        onChange={e => handlePostEdit(e.target.value, 'content')}/>
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