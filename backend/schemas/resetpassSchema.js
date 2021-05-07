const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resetpassSchema = new Schema({
    token: String,
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 900
      }
})

const Reset = mongoose.model('resetpassword', resetpassSchema);

module.exports = Reset;
