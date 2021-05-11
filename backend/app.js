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
const getCategories = require('./books/getCategories');
const addUser = require('./user/addUser');
const deleteUser = require('./user/deleteUser');
const modifyUser = require('./user/modifyUser');
const getUser = require('./user/getUser');

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

app.post('/getcategories', (req, res) => {
    getCategories(req, res);
})

app.post('/adduser', (req, res) => {
    addUser(req, res);
})

app.delete('/deleteuser/:userId', (req, res) => {
    deleteUser(req, res);
})

app.patch('/modifyuser/:userId', (req, res) => {
    modifyUser(req, res);
})

app.post('/getuser/:userId', (req, res) => {
    getUser(req, res);
})

app.listen(3000);