const Note = require("../models/NoteModel");

exports.getAllNotes = async (req, res) => {
  try {
    const data = await Note.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// exports.getNoteByDate = (req, res) => {
//   const date = req.params.date;
//   Note.getByDate(date, (err, data) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error fetching note by date", error: err });
//     if (!data) return res.status(404).json({ message: "Note not found" });

//     res.json(data);
//   });
// };
exports.completeTodos = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Note.completeTodos(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "todo not found" });
    res.status(200).json({ message: "update completed" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

exports.createNote = async (req, res) => {
  const { title, content, note_date } = req.body;
  try {
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "title, content, and date are required" });
    }

    // const newNote = { title, content, date };

    // Note.create(newNote, (err, data) => {
    //   if (err)
    //     return res
    //       .status(500)
    //       .json({ message: "Error creating note", error: err });
    //   res.status(201).json(data);
    // });
    const result = await Note.create(title, content, note_date);
    res
      .status(201)
      .json({ message: "insert successfully", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

// exports.updateNote = (req, res) => {
//   const date = req.params.date;
//   const updatedContent = req.body.content;

//   if (!updatedContent) {
//     return res.status(400).json({ message: "content is required" });
//   }

//   Note.update(date, updatedContent, (err, data) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error updating note", error: err });
//     res.json(data);
//   });
// };

// exports.deleteNote = (req, res) => {
//   const date = req.params.date;
//   Note.delete(date, (err, data) => {
//     if (err)
//       return res
//         .status(500)
//         .json({ message: "Error deleting note", error: err });

//     res.json({ message: "Note deleted" });
//   });
// };
