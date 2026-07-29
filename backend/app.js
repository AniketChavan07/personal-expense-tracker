import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';
import errorHandler, { notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/expenses', expenseRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
