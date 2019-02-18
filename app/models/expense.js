const mongoose = require('mongoose'), Schema = mongoose.Schema;

const ExpenseSchema = Schema({
    title: { type: String, required: true},
    amount: { type: String, required: true},
    notes: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    categories : [{ type: Object }],
    createdAt: { type: Date, required: true, default: Date.now }
});

module.exports = mongoose.model('Expense', ExpenseSchema);