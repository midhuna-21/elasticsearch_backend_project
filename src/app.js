import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import config from "./config/config.js";

const app = express();

// Configure CORS
const corsOptions = {
    origin: "https://elasticsearch-frontend-project-nkxb-jozlgkga1.vercel.app", // Match frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Required to allow cookies/credentials
};

app.use(cors(corsOptions));

// Explicitly set CORS headers for preflight requests
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://elasticsearch-frontend-project-nkxb-jozlgkga1.vercel.app"); // Match origin
    res.setHeader("Access-Control-Allow-Credentials", "true"); // Enable credentials
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allowed methods
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allowed headers
    next();
});

// Connect to database
dbConnect();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("public/"));

// Routes
app.use("/api/user", userRoutes);

// Start the server
app.listen(config.PORT, () => {
    console.log(`Server running at ${config.PORT}`);
});
