const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../public'));



// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));


// Displays all notes
app.get('/api/notes', (req, res) => {
  res.json(notes)); //NEED TO FIGURE OUT HOW TO RESPOND WITH ALL NOTES IN DB
}
// Displays a single note, or returns false
app.get('/api/notes/:note', (req, res) => {
  const chosenNote = req.params.note;

  //NEED TO FIGURE OUT HOW TO GRAB A SPECIFIED NOTE FROM THE DB


  // for (let i = 0; i < notes.length; i++) {
  //   if (chosenNote === notes[i].routeName) {
  //     return res.json(notes[i]);
  //   }
  // }

  // return res.json(false);
});

// Create New Notes - takes in JSON input
app.post('/api/notes', (req, res) => {

  //NEED TO FIGURE OUT HOW TO POST TO THE DB

  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  // const newNote = req.body;

  // newNote.routeName = newNote.name
  // console.log(newNote);

  // notes.push(newNote);
  // res.json(newNote);
});

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
