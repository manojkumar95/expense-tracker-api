const mongoose = require('mongoose'), Schema = mongoose.Schema;

const UserSchema = Schema({
    firstName: { type:String, required: true },
    lastName: { type:String, required: true },
    phoneNumber: String,
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);