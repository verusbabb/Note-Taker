//Assigning required dependencies
const express = require('express');
const htmlRoutes = require('./Routes/htmlRoutes')
const apiRoutes = require('./Routes/apiRoutes');

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./Develop/public'));

app.use(apiRoutes);
app.use(htmlRoutes);

// Starts the server to begin listening
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
