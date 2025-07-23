const Note = require('../models/NoteModel');


exports.getAllNotes = (req, res) => {
  Note.getAll((err, data) => {
    if (err) return res.status(500).json({ message: 'Error fetching notes', error: err });

    
    const cleaned = data.map(note => ({
      id: note.id,
      title: note.title || '',
      content: note.content || '',
      date: note.date || 'undefined',
    }));

    res.json(cleaned);
  });
};

exports.getNoteByDate = (req, res) => {
  const date = req.params.date;
  Note.getByDate(date, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error fetching note by date', error: err });
    if (!data) return res.status(404).json({ message: 'Note not found' });

    res.json(data);
  });
};


exports.createNote = (req, res) => {
  const { title, content, date } = req.body;

  if (!title || !content || !date) {
    return res.status(400).json({ message: 'title, content, and date are required' });
  }

  const newNote = { title, content, date };

  Note.create(newNote, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error creating note', error: err });
    res.status(201).json(data);
  });
};

exports.updateNote = (req, res) => {
  const date = req.params.date;
  const updatedContent = req.body.content;

  if (!updatedContent) {
    return res.status(400).json({ message: 'content is required' });
  }

  Note.update(date, updatedContent, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error updating note', error: err });
    res.json(data);
  });
};


exports.deleteNote = (req, res) => {
  const date = req.params.date;
  Note.delete(date, (err, data) => {
    if (err) return res.status(500).json({ message: 'Error deleting note', error: err });

    res.json({ message: 'Note deleted' });
  });
};
