import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        password: {
            type: String,
        },
    },
    { timestamps: true }
);

const user = mongoose.model("user", userSchema);
export { user };
