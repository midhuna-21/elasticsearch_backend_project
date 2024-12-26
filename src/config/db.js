import mongoose from "mongoose";
import config from "./config.js";

const dbConnect = async () => {
    try {
        const mongoURI = config.MONGO_URI;
        await mongoose.connect(mongoURI);
        console.log("DB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
};

export default dbConnect;
