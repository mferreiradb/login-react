const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "react_crud"
});

app.get('/', (req, res) => {
    res.json({mensagem: 'Conectado'})
})

app.listen(8080, () => {
    console.log('Servidor online na url http://localhost:8080')
})