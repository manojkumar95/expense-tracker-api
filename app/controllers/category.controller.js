const Category = require('../models/category.js');

const findAllCategories = (req, res) => {
	Category.find()
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(412).send({
            message: err.message
        });
    });
};

const createCategory = (req, res) => {
	Category.create(req.body.category)
    .then(categories => {
        res.send(categories);
    }).catch(err => {
        res.status(412).send({
            message: err.message
        });
    });
};

module.exports = {
    createCategory,
    findAllCategories
}