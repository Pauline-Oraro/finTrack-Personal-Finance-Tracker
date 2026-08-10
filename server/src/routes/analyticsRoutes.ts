import { Router } from "express";
import { getAllYears, getCurrentMonthExpenses, getDashboardStats, getExpensesByCategories, getMonthlyTotals, getPeriodStats, getSpendingTrends, getYearlyCategoryStats } from "../controllers/analyticsControllers";


const analyticsRoutes = Router();

analyticsRoutes.get("/category",  getExpensesByCategories);
analyticsRoutes.get("/monthly", getMonthlyTotals);
analyticsRoutes.get("/dashboard", getDashboardStats);
analyticsRoutes.get("/trends", getSpendingTrends);
analyticsRoutes.get("/period",  getPeriodStats);
analyticsRoutes.get("/current-month",  getCurrentMonthExpenses);
analyticsRoutes.get("/yearly-categories",  getYearlyCategoryStats);
analyticsRoutes.get("/all-years", getAllYears);

export default analyticsRoutes;