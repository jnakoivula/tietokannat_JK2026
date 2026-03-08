var express = require('express');
var router = express.Router();

var db = require('../config/database');

//testing stuff
router.get('/test', function(req, res) {
    res.json({
        message: "Testing testing"
    });
});

//testing GET
router.get('/example', function(request, response){
    response.send('I am example');
    console.log('I am example');
});

//testing GET with one parameter
router.get('/example/:name', function(request, response){
    response.send('Hello '+request.params.name);
});

//testing GET with two parameters
router.get('/example2/:firstName/:lastName', function(request, response){
    response.send('Hello '+request.params.firstName+" "+request.params.lastName);
});

//testing GET two with alternative syntax &
router.get('/example2/:firstName&:lastName', function(request, response){
    response.send('Hello '+request.params.firstName+" "+request.params.lastName);
});

//testing POST method
router.post('/example', function(request, response){
    response.send(request.body);
    console.log(request.body);
});

//GET all books
router.get('/books', function(req, res){
    db.query("SELECT * FROM book", function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//POST, add new book
router.post('/books', function(req, res){
    const { name, author, isbn } = req.body;
    db.query(
        "INSERT INTO book (name, author, isbn) VALUES (?, ?, ?)", [name, author, isbn],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Book added successfully", id: result.insertId
                });
            }
        }
    );
});

//UPDATE a book
router.put('/books/:id', function(req, res){
    const id = req.params.id;
    const { name, author, isbn } = req.body;
    db.query("UPDATE book SET name =?, author=?, isbn=? WHERE id_book=?", [name, author, isbn, id],
        function(err,result) {
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Book updated successfully"
                });
            }
        }
    );
});

//DELETE a book
router.delete('/books/:id', function(req, res){
    const id = req.params.id;

    db.query("DELETE FROM book WHERE id_book=?",[id],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Book deleted successfully"
                });
            }
        }
    );
});


//GET all borrowers
router.get('/borrowers', function(req, res){
    db.query("SELECT * FROM borrower", function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//POST, add new borrower
router.post('/borrowers', function(req, res){
    const { fname, lname, streetAddress } = req.body;
    db.query(
        "INSERT INTO borrower (fname, lname, streetAddress) VALUES (?, ?, ?)", [fname, lname, streetAddress],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Borrower added successfully", id: result.insertId
                });
            }
        }
    );
});

//UPDATE a book
router.put('/borrowers/:id', function(req, res){
    const id = req.params.id;
    const { fname, lname, streetAddress} = req.body;
    db.query("UPDATE borrower SET fname =?, lname=?, streetAddress=? WHERE id_borrower=?", [fname, lname, streetAddress, id],
        function(err,result) {
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Borrower updated successfully"
                });
            }
        }
    );
});

//DELETE a borrower
router.delete('/borrowers/:id', function(req, res){
    const id = req.params.id;

    db.query("DELETE FROM borrower WHERE id_borrower=?",[id],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Borrower deleted successfully"
                });
            }
        }
    );
});

module.exports = router;