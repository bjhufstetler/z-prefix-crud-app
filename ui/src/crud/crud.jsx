import config from './../config';
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || 'development'].apiUrl;

export const CRUD = ({ method, path, data }) => {
    //method: POST, PATCH, DELETE, GET
    const id = data.id ? data.id : '';
    const tmp = {...data}
    delete(tmp['id']);
    const baseURL = `${ApiUrl}/api/`
    let fetchBody = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tmp)
    }
    if(method !== 'DELETE') fetchBody = {...fetchBody, body: JSON.stringify(tmp)}
    fetch(`${baseURL}${path}/${id}`, fetchBody)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Cannot convert response to json');
        };
    });
};