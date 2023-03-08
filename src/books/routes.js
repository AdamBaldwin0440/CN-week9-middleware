const {Router} = require("express");
const bookRouter = Router();

const {hashPass, comparePass, tokenCheck} = require("../middleware");
const {addBook, getAllBooks, updateBook, deleteBook} = require("./controllers");

bookRouter.post("/books/addbook", tokenCheck, addBook);
bookRouter.get("/books/getallbooks", tokenCheck, getAllBooks);
bookRouter.put("/books/updatebook", tokenCheck, updateBook);
bookRouter.delete("/books/deletebook", tokenCheck, deleteBook);

module.exports = bookRouter;