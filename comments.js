// Create web server application

// Importing packages
const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');
const app = express();

// Setting up the application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Setting up the database
const Datastore = require('nedb');
const db = new Datastore('database.db');
db.loadDatabase();

// Setting up the server
app.listen(3000, () => console.log('listening at 3000'));

// Setting up the routes
app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        response.json(data);
    });
});

app.post('/api', [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('comment').isLength({ min: 1 }).withMessage('Comment is required'),
    sanitizeBody('name').escape(),
    sanitizeBody('comment').escape()
], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.array() });
    }
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    db.insert(data);
    response.json(data);
});