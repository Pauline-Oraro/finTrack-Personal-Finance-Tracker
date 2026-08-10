import { Router } from "express";
import { deleteAccount, deleteAvatar, exportData, getAvatar, getProfile, updateProfile, uploadAvatar } from "../controllers/profileControllers";

const profileRoutes = Router();

// get profile route
profileRoutes.get("/", getProfile);

// update profile route
profileRoutes.put("/", updateProfile);

// upload user avatar route
profileRoutes.post("/avatar", uploadAvatar);

// get user avatar route
profileRoutes.get("/avatar", getAvatar);

// delete user avatar route
profileRoutes.delete("/avatar", deleteAvatar);

// delete user account route
profileRoutes.delete("/account", deleteAccount);

// export data route
profileRoutes.get("/export", exportData);

export default profileRoutes;