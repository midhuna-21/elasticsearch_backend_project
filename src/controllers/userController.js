import {
    comparePassword,
    hashPassword,
} from "../utils/funtions/passwordHashAndCompare.js";
import { user } from "../model/userModel.js";
import { generateOtp } from "../utils/funtions/generateOtp.js";
import { generateUserTokens } from "../utils/jwt/generateToken.js";

const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let existUser = await user.findOne({ email: email });
        if (existUser) {
            return res.status(400).json({ message: "Email already exist" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please ensure all required fields are filled out.",
            });
        }
        const securePassword = await hashPassword(password);
        const userCreated = await user({
            name,
            email,
            password: securePassword
        }).save()
        console.log(userCreated,'userCatedd')

        return res.status(200).json({ user: userCreated });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
   try {
       const { email, password } = req.body;
       let isUser= await user.findOne({ email }); 
        if (!isUser) {
           return res.status(401).json({ message: "no user registered for this email" });
        }
        
       const isPasswordValid = await comparePassword(password, isUser.password);
       if (!isPasswordValid) {
           return res.status(401).json({ message: "Invalid password" });
       }
       const userId = isUser._id.toString();
       console.log(userId,'userId')
       const { accessToken, refreshToken } = generateUserTokens(res, {
           userId,
       });  
       console.log(refreshToken,'user logged in ');
       return res.status(200).json({ user:isUser, accessToken, refreshToken });
   } catch (error) {
       console.error(error.message);
       return res.status(500).json({ message: "Internal server error" });
   }
};

const logoutUser = async (req, res) => {
   try {
       res.clearCookie("token", { httpOnly: true, secure: true });
       return res.status(200).json({ message: "Logout successfully" });
   } catch (error) {
       console.error(error.message);
       return res.status(400).json({ message: "Internal server error" });
   }
};


export {
   signupUser,
   loginUser,
   logoutUser,
};