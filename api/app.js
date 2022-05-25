const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(express.urlencoded({ extended: true, type: '*/x-www-form-urlencoded'}));

app.use((req, res, next) => {
    res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    res.header({
        'Access-Control-Allow-Headers':
        'Origin, X-Requested-Wigh, Content-Type, Accept',
    });
    res.header({
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    });
    next();
});



app.get('/api', (req, res) => {
    res.status(200).send('It works!')
})

app.get('/api/:table', (req, res) => {
    let base = knex(req.params.table)
    if(req.query.id) base = base.where('id', req.query.id)
    if(req.query.user_id) base = base.where('user_id', req.query.user_id)
    base
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)});
})

app.post('/api/:table', (req, res) => {
    knex(req.params.table)
    .insert(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occured, please contact your network administrator.',
            error: err
        });
    });
});

app.patch('/api/:table/:id', (req, res) => {
    knex(req.params.table)
    .where('id', req.params.id)
    .update(req.body)
    .then(() => {
        knex(req.params.table)
        .then(data => res.status(200).json(data));
    })
    .catch(err => {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred, please contact your network administrator.',
            error: err
        });
    });
});

app.delete('/api/:table/:id',(req, res) => {
    knex(req.params.table)
    .where('username', req.params.id)
    .del()
    .then(() => {
        knex(req.params.table)
        .then(data => res.status(200).json(data));
    })
    .catch(err => {
        console.log(err);
        return res.json({
            success: false,
            message: 'An error occurred, please contact your network administrator.',
            error: err
        });
    });
});

module.exports = app;