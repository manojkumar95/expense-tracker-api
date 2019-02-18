module.exports = app => {
    const categories = require('../controllers/category.controller.js');
    
    // Find all categories
	app.get('/api/categories', categories.findAllCategories);
			
	// Insert a category in the Category collection
    app.post('/api/category/create', categories.createCategory);
}