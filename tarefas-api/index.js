const express = require('express');
const bodyParser = require('body-parser');
const tarefasRouter = require('./routes/tarefas');


const app = express();
const PORT = 3000;

// Middleware para tratar JSON
app.use(bodyParser.json());


// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo à API de Tarefas! Use /tarefas para interagir.');
  });


// Rota de tarefas
app.use('/tarefas', tarefasRouter);


// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});