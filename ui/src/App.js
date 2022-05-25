import React, { useEffect, useState } from 'react';
import { styled, Button, TextField, Card, CardContent, Typography, CardHeader, CardActions, IconButton, IconButtonProps, Collapse } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { useFetch } from './hooks'
import { useAppContext } from './context';
import { Bar } from './components'
import './App.css'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />
})(({ theme, expand}) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const App = () => {
  const appContext = useAppContext();
  const posts = useFetch('http://localhost:8080/api/post');
  const users = useFetch('http://localhost:8080/api/user');
  const [postData, setPostData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => { // Use this to combine the user data with the post data
    if(posts.load && users.load) {
      setPostData([...posts.data].map(post => {
        return({...post, user: users.data.filter(user => user.id === post.user_id)[0]})
      }))
    }
  }, [posts.load, users.load]);

  return(
    <>
      <Bar />
      <div>
        {postData.map((post, index) => (
          <Card variant='outlined' key={index}>
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
        ))}
      </div>
    </>
  )
};