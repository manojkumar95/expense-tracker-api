const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: { type:String, required: true },
    type: { type:String, required: true, default: 'Custom' }, // to identify if category exists by default or custom created by user
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Category', CategorySchema);