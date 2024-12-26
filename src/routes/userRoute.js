import express from 'express';
import { signupUser,
   loginUser,
   logoutUser,
} from '../controllers/userController.js';
import {fetchBooks, createBook} from '../controllers/bookController.js'
import upload from "../utils/funtions/imageStore.js";
import { userVerifyToken } from "../utils/middleware/authMiddlware.js";
import { userRefreshToken } from "../controllers/userRefreshToken.js";

const userRoutes = express.Router()

userRoutes.post("/refresh-token", userRefreshToken);

userRoutes.post("/signup", signupUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout", logoutUser);

//book

userRoutes.post("/create", upload.single('image'),createBook);

userRoutes.get("/books",fetchBooks);

export default userRoutes 