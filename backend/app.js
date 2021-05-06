const express = require("express");
const app = express();
app.use(express.json());

const login = require("./auth/login");
const register = require("./auth/register");
const confirm = require('./auth/confirm');

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/imdb');

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


app.listen(3000);