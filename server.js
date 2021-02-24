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

// Basic route that sends the user first to the Get Started Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/index.html')));

//Route that sends user to the Notes page
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './Develop/public/notes.html')));


// Route that displays all notes
app.get('/api/notes', (req, res) => { res.json(storedNotes) })


// Route that creates new notes; assigns them a unique ID to enable app.delete to delete the selected object in the storedNotes array
app.post('/api/notes', (req, res) => {
  let newNote = req.body


  // This allows the test note to be the original note.
  let highestId = 99;
  // This loops through the array and finds the highest ID.
  for (let i = 0; i < storedNotes.length; i++) {
    let individualNote = storedNotes[i];

    if (individualNote.id > highestId) {
      // highestId will always be the highest numbered id in the notesArray.
      highestId = individualNote.id;
    }
  }
  // This assigns an ID to the newNote. 
  newNote.id = highestId + 1;


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

//FROM CARLY
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.params.id)
  let note = storedNotes.find(({ id }) => id === JSON.parse(req.params.id));
  storedNotes.splice(storedNotes.indexOf(note), 1);
  res.end("Note deleted")
})
//END FROM CARLY

//ATTEMPTING REWRITE TRYING TO USE TEST RATHER THAN ID (DOESN'T WORK)
// app.delete('/api/notes/:title', (req, res) => {
//   console.log(req.params.title)
//   let note = storedNotes.find(({ title }) => title === req.params.title);
//   storedNotes.splice(storedNotes.indexOf(note), 1);
//   res.end("Note deleted")
// })

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
