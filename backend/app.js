const express = require("express");
const app = express();
app.use(express.json());

const login = require("./auth/login");
const register = require("./auth/register");
const confirm = require('./auth/confirm');
const forgot = require('./auth/forgot');
const reset = require('./auth/reset');
const populate = require('./populate/populate');
const getByCategory = require('./books/getByCategory');
const addReview = require('./books/addReview');
const getbooks = require('./books/getbooks');
const loadbook = require('./books/loadbook');
const modifyReview = require('./books/modifyReview');
const deleteReview = require('./books/deleteReview');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.AUTH, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>{
    console.log("Connected To USERDB!");
})

const cors = require('cors');
app.use(cors());

app.post('/login', (req, res) => {
    login(req, res);
})

app.post('/register', (req, res) => {
    register(req, res);
})

app.get('/confirm/:token', (req, res) => {
    confirm(req, res);
})

app.post('/forgotpass', (req, res) => {
    forgot(req, res);
})

app.post('/resetpass', (req, res) => {
    reset(req, res);
})

//Temporary endpoint to populate database
app.post('/populate', (req, res) => {
    populate(req, res);
})

app.post('/categories', (req, res) => {
    getByCategory(req, res);
})

app.post('/addreview/:bookId', (req, res) => {
    addReview(req, res);
})

app.post('/getbooks', (req, res) => {
    getbooks(req, res);
})

app.post('/book', (req, res) =>{
    loadbook(req, res);
})

app.post('/modify/:reviewId', (req, res) => {
    modifyReview(req, res);
})

app.delete('/deleteReview/:reviewId', (req, res) => {
    deleteReview(req, res);
})

app.listen(3000);