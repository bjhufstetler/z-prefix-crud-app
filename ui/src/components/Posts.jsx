import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks';
import { Post } from './'
import { useAppContext } from '../context';

export const Posts = () => {
    const appContext = useAppContext();
    const posts = useFetch(appContext.postURL);
    const users = useFetch(appContext.userURL);
    const [postData, setPostData] = useState([]);
    
    useEffect(() => { // Use this to combine the user data with the post data
    if(posts.load && users.load) {
        setPostData([...posts.data].map(post => {
        return({...post, user: users.data.filter(user => user.id === post.user_id)[0]})
        }))
    }
    }, [posts.load, users.load]);

    return(
        <div>
        {postData.sort((a,b) => (a.timestamp > b.timestamp) ? 1 : -1).map((post, index) => (
            <Post post={post} key={index} />
        ))}
      </div>
    )
}