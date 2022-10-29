const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({mensagem: "Hello world"})
})

app.listen(8080, () => {
    console.log('Servidor online na url http://localhost:8080')
})