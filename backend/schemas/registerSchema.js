const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const registerSchema = new Schema({
    username: String,
    email: String,
    role: String,
    password: String,
    token: String,
    expireAt: {
        type: Date,
        default: Date.now,
        expires: 900
      },
})
//createdAt: { type: Date, expires: 70, default: Date.now },
//registerSchema.index({ createdAt: 1 }, {expireAfterSeconds: 9 });
const RegisterInfo = mongoose.model('registerInfo', registerSchema);
module.exports = RegisterInfo;

