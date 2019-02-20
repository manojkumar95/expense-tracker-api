module.exports = app => {
    const users = require('../controllers/user.controller.js');
    
    // Find the first user
    app.get('/api/user', users.findFirstUser);
			
	// Insert a user in the User collection
    app.post('/api/user/update', users.updateUser);
}