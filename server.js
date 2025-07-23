const express = require('express');
const dotenv = require('dotenv');
const noteRoutes = require('./app/routes/NoteRoute');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
