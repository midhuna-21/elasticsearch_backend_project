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
            type: String,
        },
        publishedYear: {
            type: String,
        },
    },
    { timestamps: true }
);

const books = mongoose.model("books", bookSchema);
export { books };
