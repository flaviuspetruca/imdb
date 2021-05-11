const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: String,
    email: String,
    role: {type: String, default: "user"},
    password: String,
    reviewCount: {type: Number, default: 0}
})

const User = mongoose.model('user', userSchema);

module.exports = User;

