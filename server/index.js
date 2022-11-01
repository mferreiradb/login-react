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
        let sql = "SELECT * FROM users WHERE email = ?";
        let insert = "INSERT INTO users (email, senha) VALUES (?, ?) "
        db.query(sql, [email], (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                db.query(insert, [email, senha], (err, result) => {
                    if (err) throw err;
                    res.send({msg: 'Usuário cadastrado'})
                })
            } else {
                res.send({msg: 'Usuário já cadastrado'})
            }
        });
    });

})

app.get('/', (req, res) => {
    res.json({ mensagem: 'Conectado' })
})

app.listen(8080, () => {
    console.log('Servidor online na url http://localhost:8080')
})