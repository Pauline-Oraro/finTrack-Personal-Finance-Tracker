import {NextFunction, Request, Response } from "express";
import { asyncHandler, sendSuccess } from "../utils/responseHelpers";
import { AppError } from "../middleware/errorHandler";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { AuthResponse } from "../types";
import { generateToken } from "../utils/tokenHelpers";

// signup
export const signup = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {name, email, password} = req.body;

      if (!name || !email || !password){
        throw new AppError("Please provide name, email and password", 400)
      };

      if (name && name.trim().length < 2){
        throw new AppError("Name must be at least 2 characters.", 400);
      };

      if (name && name.trim().length > 50){
        throw new AppError("Name cannot exceed 50 characters.", 400)
      };

      if (email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError("Invalid email format", 400);
      }
      };

      if (password) {
         if (password.length < 8) {
        throw new AppError("Password must be at least 8 characters.", 400);
      }

      const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/;
      if (!passwordRegex.test(password)){
        throw new AppError(
          "Password must contain uppercase, lowercase, number, and special character (@$!%*?&)",
          400
        );
      }
      };

      const existingUser = await User.findOne({email : email})

      // if user exists
      if (existingUser){
        throw new AppError("Email already registered", 400);
      }

      //converting user's password it into a secure, scrambled, one-way string of characters before storing it in your database
      const hashedPassword = await bcrypt.hash(password, 10);

      // create a new user and save to the db
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      const savedUser = await newUser.save();

      const userObject = savedUser.toObject();

      const { password: _, ...userWithoutPassword } = userObject;

      const authResponse: AuthResponse = {
      user: { ...userWithoutPassword, _id: savedUser._id.toString() },
    };

    sendSuccess(res, authResponse, "Account created successfully!", 201);
}
);

// login
export const login = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const {email, password} = req.body;

        if(!email || !password){
            throw new AppError("Please provide email and password", 400)
        };

        const user = await User.findOne({email: email});

        if(!user){
            throw new AppError("Invalid email or password", 400)
        };

        const isPasswordValid = bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
        throw new AppError("Invalid email or password", 401);
    };

    const userObject = user.toObject();

    const { password: _, ...userWithoutPassword } = userObject;

    const token = generateToken(user._id.toString());

    const authResponse: AuthResponse = {
        user: { ...userWithoutPassword, _id: user._id.toString() },
        token,
    };

    sendSuccess(res, authResponse, "Login successful");
    }
);