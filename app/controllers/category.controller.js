const Category = require('../models/category.js');

const findAllCategories = (req, res) => {
	Category.find()
    .then(categories => {
        let categoryList = [];
        categories.forEach(category => {
            const { _id, name, type } = category;
            categoryList.push({
                id: _id,
                name,
                type
            });
        })
        res.send({
            status: 'Success',
            categories: categoryList
        });
    }).catch(err => {
        res.status(412).send({
            message: err.message
        });
    });
};

const createCategory = (req, res) => {
	Category.create(req.body)
    .then(category => {
        const { _id, name, type } = category;
        res.send({
            status: 'Success',
            category: {
                id: _id,
                name,
                type
            }
        });
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