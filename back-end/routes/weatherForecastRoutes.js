// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const { authenticateToken } = require('../middleware/auth');
// Protected routes
router.post('/:tripId/expenses', authenticateToken, expenseController.createExpense);
router.get('/:tripId/expenses', authenticateToken, expenseController.getExpenses);
router.delete('/:tripId/expenses/:expenseId', authenticateToken, expenseController.deleteExpense);

module.exports = router;