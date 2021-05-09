const express = require("express");
const app = express();
app.use(express.json());

const login = require("./auth/login");
const register = require("./auth/register");
const confirm = require('./auth/confirm');
const forgot = require('./auth/forgot');
const reset = require('./auth/reset');
const populate = require('./populate/populate');
const getbooks = require('./getbooks');
const loadbook = require('./loadbook');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.AUTH, { useNewUrlParser: true }, ()=>{
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

app.post('/getbooks', (req, res) => {
    getbooks(req, res);
})

app.post('/book', (req, res) =>{
    loadbook(req, res);
})


app.listen(3000);