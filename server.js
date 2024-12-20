const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Handle POST requests for the Mad Lib
server.post('/ITC505/lab-7/submit', (req, res) => {  // Updated route to match form action
    const { noun, adjective, verb, place, number } = req.body;

    if (!noun || !adjective || !verb || !place || !number) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
        In the ${adjective} expanse of space, a group of brave ${noun}s decided to ${verb}.
        Their destination? ${place}, which is ${number} light years away. 
        Leading the mission was a skilled ${noun} with a knack for adventure!
    `;

    res.send(`
        <h1>Mission Success!</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
});

// Server setup
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port ${port}`));
