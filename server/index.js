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

app.post('/login', (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;

    db.connect(() => {

        let sql = "SELECT * FROM users WHERE email = ? AND senha = ?";

        db.query(sql, [email, senha], (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result.length > 0) {
                res.send({ msg: "Usuário logado" })
            } else {
                res.send({ msg: "Conta não encontrada" })
            }
        })
    })
})

app.post('/cad', (req, res) => {

    const email = req.body.email;
    const senha = req.body.senha;

    db.connect(() => {

        console.log("Connected!");

        let sql = "SELECT * FROM users WHERE email = ?";
        let insert = "INSERT INTO users (email, senha) VALUES (?, ?)";

        db.query(sql, [email], (err, result) => {
            if (err) {
                res.send(err)
            }
            if (result.length == 0) {
                db.query(insert, [email, senha], (err, result) => {
                    if (err) {
                        res.send(err)
                    }
                    res.send({ msg: 'Usuário cadastrado' })
                })
            } else {
                res.send({ msg: 'Usuário já cadastrado' })
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