import { books } from "../model/bookModel.js";
import client from "../utils/funtions/elasticsearch.js";

const createBook = async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const isbn = parseInt(req.body.isbn, 10);
        const publishedYear = parseInt(req.body.publishedYear, 10);

        if (!req.file) {
            return res
                .status(404)
                .json({ message: "Please provide book image" });
        }
        const image = req.file.filename;
        const saveBook = await new books({
            title,
            author,
            description,
            isbn,
            publishedYear,
            image,
        }).save();
        await client.index({
            index: "books",
            body: {
                bookId: saveBook._id,
                title: saveBook.title,
                author: saveBook.author,
                description: saveBook.description,
                isbn: saveBook.isbn,
                publishedYear: saveBook.publishedYear,
                image: saveBook.image,
            },
        });

        return res.status(201).json({
            message: "Book created successfully",
            data: saveBook,
        });
    } catch (error) {
        console.error("Error in while creating book", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const fetchBooks = async (req, res) => {
    try {
        const { page = 1, search = "" } = req.query;
        const limit = 8;
        const from = (page - 1) * limit;
        const response = await client.search({
            index: "books",
            body: {
                from,
                size: limit,
                query: search
                    ? {
                          bool: {
                              should: [
                                  { match: { title: search } },
                                  { match: { author: search } },
                                  { match: { isbn: search } },
                              ],
                          },
                      }
                    : {
                          match_all: {},
                      },
            },
        });
        const books = response.hits.hits;
        const totalResults = response.hits.total.value;
        const totalPages = Math.ceil(totalResults / limit);
        return res.status(200).json({ books, totalPages, page });
    } catch (error) {
        console.error("Error in while fetching books", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const fetchBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const response = await client.search({
            index: "books",
            body: {
                query: {
                    term: {
                        _id: bookId,
                    },
                },
            },
        });
        const book = response.hits.hits[0];
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ book });
    } catch (error) {
        console.error("Error in while fetching books", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.file,';filefilefile')

        const { title, author, description, bookid } = req.body;

        const isbn = parseInt(req.body.isbn, 10);
        const publishedYear = parseInt(req.body.publishedYear, 10);

        let image;
        if (req.file) {
            console.log(req.file,';file')
            image = req.file.filename;
        }
        console.log(image,'imageimageimage')

        const book = await books.findById({ _id: bookid });
        console.log(book?.image,'image mongo')
        const saveBook = await books.findByIdAndUpdate(
            { _id: bookid },
            {
                title: title || book.title,
                author: author || book.author,
                description: description || book.description,
                isbn: isbn || book.isbn,
                publishedYear: publishedYear || book.publishedYear,
                image: image || book.image,
            },
            { new: true }
        );
        console.log(saveBook?.image,'image mongo')

        await client.update({
            index: "books",
            id: id,
            doc: {
                title: saveBook.title,
                author: saveBook.author,
                description: saveBook.description,
                isbn: saveBook.isbn,
                publishedYear: saveBook.publishedYear,
                image: saveBook.image,
            },
        });

        return res.status(200).json({ message: "Book updated succssfully" });
    } catch (error) {
        console.error("Error in while updating book", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id, bookId } = req.params;
        const deleteBook = await books.deleteOne({ _id: bookId });
        const elast = await client.delete({
            index: "books",
            id: id,
        });
        return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Error in while deleting book", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export { createBook, fetchBooks, updateBook, deleteBook, fetchBook };
