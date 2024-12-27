import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
        },
        author: {
            type: String,
        },
        description: {
            type: String,
        },
        image: { type: String },
        isbn: {
            type: Number,
        },
        publishedYear: {
            type: Number,
        },
    },
    { timestamps: true }
);

const books = mongoose.model("books", bookSchema);
export { books };
