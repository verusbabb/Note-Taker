const express = require('express');
const path = require('path');
const fs = require('fs');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

var storedData = fs.readFileSync('./Develop/db/db.json');
var storedNotes = JSON.parse(storedData);
console.log(storedNotes);

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));


// Displays all notes
app.get('/api/notes', (req, res) => { res.json(storedNotes) })

// Displays a single note, or returns false
app.get('/api/notes/:note', (req, res) => {

  const chosenNote = req.params.note;

  res.json(chosenNote);

});

// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {

  storedNotes.push(req.body);
  console.log(storedNotes);
  let storedData = JSON.stringify(storedNotes);
  fs.writeFile('./Develop/db/db.json', storedData, finished);


  function finished(err) {
    console.log('New note added!');
    console.log(err);
  }
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
