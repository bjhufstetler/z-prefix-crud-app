import React, { useState } from 'react';
import { useAppContext } from '../context';
import { Card, CardHeader, CardContent, Typography, CardActions, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit'
import styled from '@emotion/styled';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />
  })(({ theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
  }));

export const Post = ( props ) => {
    const appContext = useAppContext();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const post = props.post;

    return(
        <Card variant='outlined'>
            <CardHeader
                avatar={post.title}
                title={`@${post.user.username} - ${post.user.first} ${post.user.last}`}
                subheader={post.timestamp}
                action={appContext.username === post.user.username ? <IconButton><EditIcon /></IconButton> : <></>}
                />
            <CardContent>
                <Typography>
                {expanded ? post.content : `${post.content.slice(0, 100)} ${post.content.length > 100 ? '...' : ''}`}
                </Typography>
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