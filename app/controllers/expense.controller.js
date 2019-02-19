const Expense = require('../models/expense.js');
const Category = require('../models/category.js');
const Moment = require('moment');
const mongoose = require('mongoose');

const findAllExpenses = (req, res) => {
    Expense.find({ user: '5c69217d290ddd43fa4e65e6' })
        .populate('categories')
        .exec((err, expenses) => {
            if (err) {
                res.status(412).send({
                    message: err.message
                });
            };
            res.send(expenses);
        });
}

const createExpense = (req, res) => {
    Expense.create(req.body)
        .then(expense => {
            const { _id, title, amount, notes, user, categories, createdAt } = expense;
            res.send({
                status: 'Success',
                category: {
                    id: _id,
                    title,
                    amount,
                    notes,
                    user,
                    categories,
                    createdAt
                }
            });
            res.send(expense);
        }).catch(err => {
            res.status(412).send({
                message: err.message
            });
        });
};

const findExpenseByPeriodRange = (req, res) => {
    let { fromDate, period } = req.body;
    let endDate = '';
    fromDate = Moment(fromDate).toDate();
    if (period === 'month') {
        endDate = Moment(fromDate).add(30, 'days').toDate();
    } else if (period === 'week') {
        endDate = Moment(fromDate).add(7, 'days').toDate();
    } else if (period === 'day') {
        endDate = Moment(fromDate).add(1, 'days').toDate();
    }
    let categories = [];
    Category.find()
        .then(categoriesList => {
            findExpenseSum(categoriesList, fromDate, endDate, (value, err) => {
                if (err) {
                    res.send(err);
                }
                res.send(value);
            });
        }).catch(err => {
            categories = [];
        });
};
const findExpenseSum = async (categoriesList, fromDate, endDate, callback) => {
    let amountMap = { ...categoriesList };
    await Promise.all(categoriesList.map(async (category, index) => {
        amountMap[index] = { ...amountMap[index], amount: 0 };
        await new Promise(async (resolve, reject) => {
            await Expense.find({
                'categories': mongoose.Types.ObjectId(category._id),
                'createdAt': { $gte: fromDate, $lte: endDate }
            })
                .then(async (expenses, err) => {
                    await Promise.all(expenses.map(async expense => {
                        amountMap[index].amount = amountMap[index].amount + parseInt(expense.amount, 10);
                        resolve();
                    }))
                })
            resolve();
        })
    })
    )
    return callback(amountMap, null);
}

module.exports = {
    createExpense,
    findAllExpenses,
    findExpenseByPeriodRange
};
