const { Client } = require('pg');
const express = require('express');

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client
const client = new Client({
    database: 'social-media'
});

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

const text = 'INSERT INTO users (username, bio) VALUES ($1, $2)';
const values = ['newUser', 'This is a New User Test'];

app.post('/users', (req, res) => {
    client.query(text, values, (err, result) => {
        res.send(result.rows)
    });
});


app.get('/users/:id', (req, res) => {
    const query = 'SELECT * FROM users WHERE id = '
    const params = req.params.id;
    client.query(query + params, (err, result) => {
        res.send(result.rows)
    })
})



// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
    client.connect();
})