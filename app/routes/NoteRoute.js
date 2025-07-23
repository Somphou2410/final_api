const express = require('express');
const router = express.Router();
const NoteController = require('../controllers/NoteController');

router.get('/', NoteController.getAllNotes);
router.get('/:date', NoteController.getNoteByDate); 
router.post('/', NoteController.createNote);
router.put('/:date', NoteController.updateNote);    
router.delete('/:date', NoteController.deleteNote); 

module.exports = router;
