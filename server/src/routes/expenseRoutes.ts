import {Router} from "express";
import { createExpense, deleteExpense, getAllExpenses, getExpenseById, updateExpense } from "../controllers/expenseControllers";

const expenseRoutes = Router();

// get all expenses route
expenseRoutes.get("/", getAllExpenses);

// get expense by id route
expenseRoutes.get("/:id", getExpenseById);

// create a new expense route
expenseRoutes.post("/", createExpense);

// update an expense route
expenseRoutes.put("/:id", updateExpense);

// delete an expense route
expenseRoutes.delete("/:id", deleteExpense);

export default expenseRoutes;