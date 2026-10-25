import {NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/responseHelpers";
import User from "../models/User";
import { AppError } from "../middleware/errorHandler";
import Expense from "../models/Expense";
import { ExpenseCategory } from "../types";

// get all expenses
export const getAllExpenses = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId });

        if(!user){
            throw new AppError("User not found", 404);
        };

        const {category, sort} = req.query;

        const filter: {userId: string; category?: string} = {
            userId,
        }

        if (category && typeof category === "string") {
            filter.category = category;
    };

        let query = Expense.find(filter);
        if (sort && typeof sort === "string") {
      if (sort === "amount") {
        query = query.sort({ amount: 1 });
      } else if (sort === "-amount") {
        query = query.sort({ amount: -1 });
      } else if (sort === "date") {
        query = query.sort({ date: 1 });
      } else if (sort === "-date") {
        query = query.sort({ date: -1 });
      }
    }

    const expenses = await query;

    sendSuccess(res, expenses, `Found ${expenses.length} expenses.`);

    });


// get expense by id
export const getExpenseById = asyncHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        const user = await User.findOne({_id: userId});

        if(!user){
            throw new AppError("User not found", 404);
        }

        // finding expense by id
        const {id} = req.params;

        const expense = await Expense.findById(id);

        if (!expense){
            throw new AppError("Expense not found", 404);
        };

        if (expense.userId.toString() !== userId) {
            throw new AppError("Unauthorized access to this expense", 403);
    }

    sendSuccess(res, expense, "Expense retrieved successfully");
    });


// create a new expense
export const createExpense = asyncHandler(
    async(req: Request, res: Response, next: NextFunction) => {
        const userId = req.userId;

        const user = await User.findOne({ _id: userId });

        if (!user) {
            throw new AppError("User not found", 404);
        };
        const { amount, category, description, date } = req.body;

    if (!amount) {
      throw new AppError("Amount is required", 400);
    };

    if (!category) {
      throw new AppError("Category is required", 400);
    };

    if (!description) {
      throw new AppError("Description is required", 400);
    };


    // Validation 
    if (typeof amount !== "number") {
      throw new AppError("Amount must be a number", 400);
    };

    if (amount <= 0) {
      throw new AppError("Amount must be greater than 0", 400);
    };

    if (amount > 1000000) {
      throw new AppError("Amount cannot exceed 1,000,000", 400);
    };

     const validCategories = Object.values(ExpenseCategory);
    if (!validCategories.includes(category)) {
      throw new AppError(
        `Invalid category. Must be on of: ${validCategories.join(", ")}`,
        400,
      );
    };
    
     if (description.length < 5) {
      throw new AppError("Description must be at least 5 characters", 400);
    }

    if (description.length > 100) {
      throw new AppError("Description cannot exceed 100 characters", 400);
    }

     const expenseDate = date ? new Date(date) : new Date();
    const today = new Date();

    if (expenseDate > today) {
      throw new AppError("Cannot create an expense for a future date", 400);
    };

    //create new expense and save to the db
    const newExpense = new Expense({
      userId: userId,
      amount,
      category,
      description,
      date: expenseDate,
    });

    const createdExpense = await newExpense.save();

    sendSuccess(res, createdExpense, "Expense created successfully!", 201);
    }
    );


// update an expense
export const updateExpense = asyncHandler(
    async (req: Request, res: Response, next:NextFunction) => {
         const userId = req.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { id } = req.params;
    const { amount, category, description, date } = req.body;

    const expense = await Expense.findById(id);

    if (!expense) {
      throw new AppError("Expense Not Found", 404);
    }

    if (expense.userId.toString() !== userId) {
      throw new AppError("Unauthorized access to this expense", 403);
    }

    // Validation 
    if (amount !== undefined) {
      if (typeof amount !== "number") {
        throw new AppError("Amount must be a number", 400);
      }

      if (amount <= 0) {
        throw new AppError("Amount must be greater than 0", 400);
      }

      if (amount > 1000000) {
        throw new AppError("Amount cannot exceed 1,000,000", 400);
      }
    }

    if (category !== undefined) {
      const validCategories = Object.values(ExpenseCategory);
      if (!validCategories.includes(category)) {
        throw new AppError(
          `Invalid category. Must be one of: ${validCategories.join(", ")}`,
          400,
        );
      }
    }

    if (description !== undefined) {
      if (description.length < 5) {
        throw new AppError("Description must be at least 5 characters", 400);
      }
      if (description.length > 100) {
        throw new AppError("Description cannot exceed 100 characters", 400);
      }
    }

    if (amount !== undefined) {
      expense.amount = amount;
    }

    if (category !== undefined) {
      expense.category = category;
    }

    if (description !== undefined) {
      expense.description = description;
    }

    if (date !== undefined) {
      expense.date = new Date(date);
    }

    const updatedExpense = await expense.save();

    sendSuccess(res, updatedExpense, "Expense updated successfully!");
    });


// delete an expense
export const deleteExpense = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.userId;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const { id } = req.params;

    const expense = await Expense.findById(id);

    if (!expense) {
      throw new AppError("Expense Not Found", 404);
    }

    if (expense.userId.toString() !== userId) {
      throw new AppError("Unauthorized access to this expense", 403);
    }

    await Expense.findByIdAndDelete(id);

    sendSuccess(res, null, "Expense deleted successfully!");
    });