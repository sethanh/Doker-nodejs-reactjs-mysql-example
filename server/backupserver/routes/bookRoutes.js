let express = require("express");
const mysql = require('mysql2');
let router = new express.Router();

// Add mysql database connection
const db = mysql.createPool({
  host: 'mysql_db', // the host name MYSQL_DATABASE: node_mysql
  user: 'NTS0902', // database user NTS0902: NTS0902
  password: 'Se2012520', // database user password Se2012520: Se2012520
  database: 'books' // database name MYSQL_HOST_IP: mysql_db
})


router.get('/get', (req, res) => {
    const SelectQuery = " SELECT * FROM  books_reviews";
    db.query(SelectQuery, (err, result) => {
        res.send(result)
    })
})

// add a book to the database
router.post("/insert", (req, res) => {
    const bookName = req.body.setBookName;
    const bookReview = req.body.setReview;
    const InsertQuery = "INSERT INTO books_reviews (book_name, book_review) VALUES (?, ?)";
    db.query(InsertQuery, [bookName, bookReview], (err, result) => {
        console.log(result)
    })
})

// delete a book from the database
router.delete("/delete/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    const DeleteQuery = "DELETE FROM books_reviews WHERE id = ?";
    db.query(DeleteQuery, bookId, (err, result) => {
        if (err) console.log(err);
    })
})

// update a book review
router.put("/update/:bookId", (req, res) => {
    const bookReview = req.body.reviewUpdate;
    const bookId = req.params.bookId;
    const UpdateQuery = "UPDATE books_reviews SET book_review = ? WHERE id = ?";
    db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
        if (err) console.log(err)
    })
})

module.exports = router;