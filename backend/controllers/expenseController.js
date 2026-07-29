import Expense from '../models/Expense.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

// @desc    Get all expenses
// @route   GET /api/expenses
// @access  Public
export const getExpenses = asyncHandler(async (req, res, next) => {
  const { search, category, sort } = req.query;

  let query = {};

  // Search by description (requires text index on description in schema, or regex)
  if (search) {
    query.description = { $regex: search, $options: 'i' };
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Build the Mongoose query
  let mongooseQuery = Expense.find(query);

  // Sorting
  if (sort) {
    const sortBy = sort === 'date_asc' ? { date: 1 } : { date: -1 };
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else {
    // Default sort by date descending
    mongooseQuery = mongooseQuery.sort({ date: -1 });
  }

  const expenses = await mongooseQuery;

  res.status(200).json({
    success: true,
    count: expenses.length,
    data: expenses
  });
});

// @desc    Create new expense
// @route   POST /api/expenses
// @access  Public
export const createExpense = asyncHandler(async (req, res, next) => {
  const { amount, description, category, date } = req.body;

  // Basic validation
  if (!amount || !description || !category || !date) {
    return next(new ApiError(400, 'Please provide all required fields'));
  }

  const expense = await Expense.create(req.body);

  res.status(201).json({
    success: true,
    data: expense
  });
});

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Public
export const deleteExpense = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(new ApiError(404, `Expense not found with id of ${req.params.id}`));
  }

  await expense.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});
