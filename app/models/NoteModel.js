const db = require('./db.js');

const Note = {
  getAll: (result) => {
    db.query('SELECT * FROM notes', (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    });
  },

  create: (data, result) => {
    db.query('INSERT INTO notes SET ?', data, (err, res) => {
      if (err) return result(err, null);
      result(null, { id: res.insertId, ...data });
    });
  },

  getById: (id, result) => {
    db.query('SELECT * FROM notes WHERE id = ?', [id], (err, res) => {
      if (err) return result(err, null);
      result(null, res[0]);
    });
  },

  update: (id, data, result) => {
    db.query('UPDATE notes SET ? WHERE id = ?', [data, id], (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    });
  },

  delete: (id, result) => {
    db.query('DELETE FROM notes WHERE id = ?', [id], (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    });
  },
};

module.exports = Note;
