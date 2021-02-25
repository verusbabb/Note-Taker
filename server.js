const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

//Grabs data from the data file
var storedData = fs.readFileSync('./Develop/db/db.json');
var storedNotes = JSON.parse(storedData);
console.log(storedNotes);

// Basic route that sends the user first to the Get Started Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

//Route route that responds with notes.html page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));


// Route that responds with notes as requested
app.get('/api/notes', (req, res) => { res.json(storedNotes) })


// Route that write new notes to data file after assigning a unique ID to the note and returns the note for html appending.
app.post('/api/notes', (req, res) => {
  let newNote = req.body
  newNote.id = uniqid();

  storedNotes.push(newNote);
  let storedData = JSON.stringify(storedNotes);
  console.log(storedNotes);

  fs.writeFile('./Develop/db/db.json', storedData, finished);

  function finished(err) {
    console.log('New note added!');
    console.log(err);
  }

  res.json(newNote)
});

//Route that deletes notes from data file as requested
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  let note = storedNotes.find(({ id }) => id === (req.params.id));
  storedNotes.splice(storedNotes.indexOf(note), 1);
  res.end("Note deleted")
})

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
