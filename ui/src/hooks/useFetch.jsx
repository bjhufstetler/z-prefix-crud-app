import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from './../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || 'development'].apiUrl;

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);
    const [load, setLoad] = useState(false);
    
    useEffect(() => {
        const baseURL = `${ApiUrl}/api/`
        fetch(`${baseURL}${url}`)
        .then( res => {
            if(res.ok) {
                console.log(res)
                return res.json();
            } else {
                throw new Error('Cannot convert response to json');
            };
        })
        .then( json => setData(json) )
        .catch( e => setErr(e) )
        .finally(() => setLoad(true));
    }, [url]);

    return { data, err, load };
};

useFetch.propTypes = {
    url: PropTypes.string
}