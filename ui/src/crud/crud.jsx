export const CRUD = ({ method, path, data }) => {
    //method: POST, PATCH, DELETE, GET
    const id = data.id ? data.id : '';
    delete(data['id']);
    fetch(`${path}/${id}`, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Cannot convert response to json');
        };
    });
};