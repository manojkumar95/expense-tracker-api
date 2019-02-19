module.exports = app => {
  const expenses = require('../controllers/expense.controller.js');

  // Find all expenses
  app.get('/api/expenses', expenses.findAllExpenses);

  // Find expenses by range period (daily, weekly or monthly)
  app.post('/api/expenses/filter', expenses.findExpenseByPeriodRange);

  // Insert a expense in the Expense collection
  app.post('/api/expense/create', expenses.createExpense);
}