const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "react_crud"
});

app.use(express.json());
app.use(cors());

app.post('/cad', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    db.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], (err, result) => {
        if (err) throw err;
        console.log("1 record inserted");
        res.send(result)
        });
        });
        
})

app.get('/', (req, res) => {
    res.json({ mensagem: 'Conectado' })
})

app.listen(8080, () => {
    console.log('Servidor online na url http://localhost:8080')
})