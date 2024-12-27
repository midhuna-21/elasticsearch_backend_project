import express from 'express';
import { signupUser,
   loginUser,
   logout,
} from '../controllers/userController.js';
import {fetchBooks, createBook, updateBook, deleteBook,fetchBook} from '../controllers/bookController.js'
import upload from "../utils/funtions/imageStore.js";
import { userRefreshToken } from "../controllers/userRefreshToken.js";
import { userVerifyToken } from "../utils/middleware/authMiddlware.js";

const userRoutes = express.Router()

userRoutes.post("/refresh-token", userRefreshToken);

userRoutes.post("/signup", signupUser);

userRoutes.post("/login", loginUser);

userRoutes.post("/logout",userVerifyToken,logout);

//book

userRoutes.post("/create", userVerifyToken,upload.single('image'),createBook);

userRoutes.get("/books",userVerifyToken,userVerifyToken,fetchBooks); 

userRoutes.get("/book/:bookId",userVerifyToken,fetchBook);

userRoutes.post("/update/:id", userVerifyToken,upload.single('image'),updateBook);

userRoutes.post("/book/delete/:id/:bookId",userVerifyToken,deleteBook);


export default userRoutes 