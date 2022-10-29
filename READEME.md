**TÉCNOLOGIAS UTILIZADAS**

*FFRONT*

- Vite

- Formik - para fazer o formulário

        npm i formik

- Yup - para validação

        npm i yup

- Cors - para middleware conect/express

        npm i cors



*BACK*

- Express

        npm i express

- mysql (conection)

        npm i mysql

- Nodemon - para que não haja necessidade de derrubar e subir o servidor a cada alteração

        npm i nodemon

- Axios - para consumo de api

        npm i axios


**SERVER/BACKEND**

*Conexão com o banco de dados utilizando express e mysql*

- Cria-se uma variável que importa o banco para ser usada na conexão do banco
- Cria-se uma variável que executa a função createConnection, tendo como valor um objeto com os dados do banco de dados

        const mysql = require('mysql');

        const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'react_crud'
        })

*Digitando queries para execução no Banco de Dados*

- Necessário fornecer permissão do MYSQL

        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

- A variável de conexão executa a função conect(), tento como falor uma função com parâmetro erro
- A função possui uma variável que receberá o comando sql
- A variável de conexão executa a função query(), tento como valor a variável que recebe o comando e uma função com parâmetro erro e resultado

        db.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO users (nome, email, senha) VALUES ('mauricio', 'mauricio#test.com', '1234')";
        db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        });
        });

*Na criação da tabela de usuários é necessário definir o campo da senha com 200 caracteres para criptografia*

*Pegando dados do formulário*

- Necessária confirguração

        app.use(express.json());
        app.use(cors());

- Dentro da função connect() chamada pelo db, executa-se a função desejada. A função deve ser executada na rota desejada

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


**CLIENT/FRONTEND**

*Consumo da API com Axios*

- A variável Axios executa o método http desejado, passando como valor o endpoint e um objeto com o nome do campo na tabela e de onde vem seu valor, através do parâmetro value, onde será indicado o nome do componente inserido no atributo name

        const handleClickCadastro = (values) => {
        Axios.post('https://localhost:8080/cad', {
        email: values.email,
        senha: values.password
        }).then((res) => {
        console.log(res);
        });
        };