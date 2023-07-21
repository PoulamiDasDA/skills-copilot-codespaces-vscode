//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

//connect to database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true, useUnifiedTopology: true});

//create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

//create model
const Comment = mongoose.model('Comment', commentSchema);

//use ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//use body-parser
app.use(bodyParser.urlencoded({extended: false}));

//use static files
app.use(express.static(path.join(__dirname, 'public')));

//render index page
app.get('/', (req, res) => {
    Comment.find({}, (err, comments) => {
        if(err) {
            console.log('Error');
        }
        else {
            res.render('index', {comments: comments});
        }
    });
});

//render new comment page
app.get('/new', (req, res) => {
    res.render('new');
});

//add new comment
app.post('/new', (req, res) => {
    Comment.create(req.body, (err, newComment) => {
        if(err) {
            console.log('Error');
        }
        else {
            res.redirect('/');
        }
    });
});

//start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
