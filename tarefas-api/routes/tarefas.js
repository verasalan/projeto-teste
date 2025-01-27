const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();


const db = new sqlite3.Database('./db/database.sqlite3');


//Listar todas as tarefas
router.get('/', (req, res) => {
    db.all('SELECT * FROM tarefas', [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});


// Criar nova tarefa
router.post('/', (req, res) => {
    const { titulo, descricao } = req.body;
    db.run(
        'INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)',
        [titulo, descricao],
        function (err) {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ id: this.lastID });
        }
    );
});


// Atualizar tarefa
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, concluida } = req.body;
    db.run(
      'UPDATE tarefas SET titulo = ?, descricao = ?, concluida = ? WHERE id = ?',
      [titulo, descricao, concluida, id],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ updated: this.changes });
      }
    );
});


// Excluir tarefa
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM tarefas WHERE id = ?', id, function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ deleted: this.changes });
    });
});
  
module.exports = router;