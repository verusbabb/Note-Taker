const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/')
    .get((req, res) => res.sendFile(path.join(__dirname, '../Develop/public/index.html')));

router.route('/notes')
    //Route route that responds with notes.html page
    .get((req, res) => res.sendFile(path.join(__dirname, '../Develop/public/notes.html')));

module.exports = router;
