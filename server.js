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
server.post('/ITC505/lab-7/index.html', (req, res) => {
    const { adjective, pluralNoun, verb, planet, occupation } = req.body;

    if (!adjective || !pluralNoun || !verb || !planet || !occupation) {
        res.send(`
            <h1>Submission Failed</h1>
            <p>Please fill out ALL fields</p>
            <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
        `);
        return;
    }

    const madLib = `
        In the ${adjective} expanse of space, a group of brave ${pluralNoun} decided to ${verb}.
        Their destination? The mysterious planet ${planet}. 
        Leading the mission was a skilled ${occupation} with a knack for adventure!
    `;

    res.send(`
        <h1>Mission Success!</h1>
        <p>${madLib}</p>
        <a href="/ITC505/lab-7/index.html">Go Back to Form</a>
    `);
});

// Server setup
let port = 80;
if (process.argv[2] === 'local') {
    port = 8080;
}
server.listen(port, () => console.log('Ready on localhost!'));
