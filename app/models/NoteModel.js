const db = require("./db.js");

const Note = {
  getAll: async () => {
    try {
      const sql = "select * from notes order by id desc ";
      const rows = await db.query(sql);
      return rows[0];
    } catch (error) {
      console.log("error::==>>", error);
    }
  },

  // create: (data, result) => {
  //   db.query("INSERT INTO notes SET ?", data, (err, res) => {
  //     if (err) return result(err, null);
  //     result(null, { id: res.insertId, ...data });
  //   });
  // },
  create: async (title, content, date) => {
    try {
      const params = [title, content, date];
      sql = "insert into notes (title,content,note_date,status)values(?,?,?,0)";
      const [result] = await db.query(sql, params);
      return result;
    } catch (error) {
      console.log("error ::==>>", error);
    }
  },
  completeTodos: async (id) => {
    try {
      const sql = "Update notes set status =1 where id =?";
      const [result] = await db.query(sql, [id]);
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getById: (id, result) => {
    db.query("SELECT * FROM notes WHERE id = ?", [id], (err, res) => {
      if (err) return result(err, null);
      result(null, res[0]);
    });
  },

  update: (id, data, result) => {
    db.query("UPDATE notes SET ? WHERE id = ?", [data, id], (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    });
  },

  delete: (id, result) => {
    db.query("DELETE FROM notes WHERE id = ?", [id], (err, res) => {
      if (err) return result(err, null);
      result(null, res);
    });
  },
};

module.exports = Note;
