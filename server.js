// import express from 'express';
const express  = require('express')
// import {getNote, getNotes} from './database.js'
const database = require('./database')



// this intaltion the express app
const app = express();
app.set('view engine', 'ejs');

// needs to parse and extract that data
app.use(express.urlencoded({extended: true}))

// this getting index file and reder in the page
app.get('/', (req, res) => { 
    res.render("index.ejs");
});

// this getting all notes and reander in the screen
app.get('/notes', (req, res)=>{
    // this help to search some word or contente to display on the 
    const searchTerm = req.query.searchTerm
    const notes = database.getNotes(searchTerm)
    res.render('notes.ejs', {notes})// this way of sending data or object in there page to acess the data or sever 
})

// this getting single id file and readering only one page
app.get('/notes/:id', (req, res)=>{
    const id = +req.params.id
    const note = database.getNote(id)
    if(!note){
        res.status(404).render('noteFound.ejs')
    }
    res.render('singleNote.ejs',{note})
})
// this for deleting

app.post('/notes/:id/delete', (req, res)=>{
    const id = +req.params.id
    database.deleteNote(id)

    res.redirect('/notes')
})
// this create page for adding new file in the database
app.get('/createNote', (req, res)=>{
    res.render('createNote.ejs')
})
// this send new nate to create in to 
app.post('/notes', (req, res)=>{
    const data = req.body
    database.addNote(data)
    // this reback the preson in to home page once the request send to the sever
    res.redirect('/notes')
   
})

// this calling all static file
app.use(express.static('public'));


// this running the server and listen to i the port
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on Port: http://localhost:${PORT}`);
});