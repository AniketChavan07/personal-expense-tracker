import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
      min: [1, 'Amount must be at least 1']
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a category']
    },
    date: {
      type: Date,
      required: [true, 'Please select a date']
    }
  },
  {
    timestamps: true
  }
);

// Create index on date for faster sorting
expenseSchema.index({ date: -1 });
// Create text index on description for searching
expenseSchema.index({ description: 'text' });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
