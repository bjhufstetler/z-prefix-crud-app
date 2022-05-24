import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null);
    const [load, setLoad] = useState(true);

    useEffect(() => {
        fetch(url)
        .then( res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error('Cannot convert response to json');
            };
        })
        .then( json => setData(json) )
        .catch( e => setErr(e) )
        .finally(() => setLoad(false));
    }, [url]);

    return { data, err, load };
};

useFetch.propTypes = {
    url: PropTypes.string
}