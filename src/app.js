import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import config from "./config/config.js";
import client from "./utils/funtions/elasticsearch.js";

const app = express();


console.log(config.API,'api frontend ')
const whitelist = [config.API]; 

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization','Credentials'],
};

app.use(cors(corsOptions));

dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("public/"));

app.use(cors(corsOptions));

app.use("/api/user", userRoutes);

app.listen(config.PORT, () => {
    console.log(`Server running at ${config.PORT}`);
});
