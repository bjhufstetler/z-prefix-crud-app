import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks';
import { Post } from './'
import { useAppContext } from '../context';
import { useLocation } from 'react-router-dom';

export const Posts = () => {
    const location = useLocation();
    let username = null;
    if(location.pathname.includes('/user/')) username = location.pathname.substring(6, location.pathname.length);
    const appContext = useAppContext();
    const posts = useFetch(appContext.postURL);
    const users = useFetch(appContext.userURL);
    const [postData, setPostData] = useState([]);
    
    useEffect(() => { // Use this to combine the user data with the post data
        if(posts.load && users.load) {
            let tmp = [...posts.data].map(post => {
                return({...post, user: users.data.filter(user => user.id === post.user_id)[0]});
                });
            if(username) tmp = tmp.filter(x => x.user.username === username);
            setPostData(tmp);
        }
    }, [posts.load, users.load, location]);

    return(
        <div>
        {postData.sort((a,b) => (a.timestamp < b.timestamp) ? 1 : -1).map((post, index) => (
            <Post post={post} key={index} />
        ))}
      </div>
    );
};