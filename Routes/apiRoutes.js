//Setting up dependencies
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uniqid = require('uniqid');


//Assigning data from the data file/parsing
var storedData = fs.readFileSync('./Develop/db/db.json');
var storedNotes = JSON.parse(storedData);
console.log(storedNotes);

// Route that responds with notes as requested
router.route('/api/notes')
    .get((req, res) => { res.json(storedNotes) })
    .post((req, res) => {
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
    })

// Route that selected note
router.route('/api/notes/:id')
    .delete((req, res) => {
        console.log(req.params.id)
        let note = storedNotes.find(({ id }) => id === (req.params.id));
        storedNotes.splice(storedNotes.indexOf(note), 1);
        res.end("Note deleted")
    })

// Exporting routes for use in server.js
module.exports = router;