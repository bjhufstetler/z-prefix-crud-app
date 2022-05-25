import React, { useState, useEffect } from 'react';
import { useFetch } from '../hooks';
import { Post } from './'



export const Posts = () => {
    
    const posts = useFetch('http://localhost:8080/api/post');
    const users = useFetch('http://localhost:8080/api/users');
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
        {postData.map((post, index) => (
            <Post post={post} key={index} />
        ))}
      </div>
    )
}