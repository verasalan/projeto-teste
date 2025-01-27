const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite3');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS tarefas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      descricao TEXT,
      concluida BOOLEAN DEFAULT 0
    )
  `);
});

db.close(() => {
  console.log("Banco de dados configurado com sucesso!");
});