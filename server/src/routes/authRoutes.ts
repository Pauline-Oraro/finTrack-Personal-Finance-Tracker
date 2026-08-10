import { Router } from "express";
import { login, signup } from "../controllers/authControllers";

const authRoutes = Router();

// signup route
authRoutes.post("/signup", signup);

// login route
authRoutes.post("/login", login);


export default authRoutes;