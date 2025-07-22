const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const path = require('path');
const app = express();

const DB_URL = require('./properties').DB_URL;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML/CSS/JS

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB at ' + DB_URL);
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html')); // default login
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
