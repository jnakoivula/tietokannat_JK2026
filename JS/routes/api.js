var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

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

//GET all opiskelijat
router.get('/opiskelijat', function(req, res){
    db.query("SELECT * FROM opiskelija", function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//POST, add new opiskelija
router.post('/opiskelijat', function(req, res){
    const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
    db.query(
        "INSERT INTO opiskelija (Etunimi, Sukunimi, Osoite, Luokkatunnus) VALUES (?, ?, ?, ?)", [Etunimi, Sukunimi, Osoite, Luokkatunnus],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Opiskelija added successfully", id: result.insertId
                });
            }
        }
    );
});

//UPDATE an opiskelija
router.put('/opiskelijat/:id', function(req, res){
    const id = req.params.id;
    const { Etunimi, Sukunimi, Osoite, Luokkatunnus } = req.body;
    db.query("UPDATE opiskelija SET Etunimi=?, Sukunimi=?, Osoite=?, Luokkatunnus=? WHERE idOpiskelija=?", [Etunimi, Sukunimi, Osoite, Luokkatunnus, id],
        function(err,result) {
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Opiskelija updated successfully"
                });
            }
        }
    );
});

//DELETE an opiskelija
router.delete('/opiskelijat/:id', function(req, res){
    const id = req.params.id;

    db.query("DELETE FROM arviointi WHERE idOpiskelija=?", [id], function(err){
        if(err){
            res.send(err);
        } else {

            db.query("DELETE FROM opiskelija WHERE idOpiskelija=?", [id], function(err,result){
                if(err){
                    res.send(err);
                } else {
                    res.json({
                        message: "Opiskelija and related grades deleted successfully"
                    });
                }
            });

        }
    });
});

//GET all opintojaksot
router.get('/opintojaksot', function(req, res){
    db.query("SELECT * FROM opintojakso", function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

//POST, add new opintojakso
router.post('/opintojaksot', function(req, res){
    const { Koodi, Laajuus, Nimi } = req.body;
    db.query(
        "INSERT INTO opintojakso (Koodi, Laajuus, Nimi) VALUES (?, ?, ?)", [Koodi, Laajuus, Nimi],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Opintojakso added successfully", id: result.insertId
                });
            }
        }
    );
});

//UPDATE an opintojakso
router.put('/opintojaksot/:id', function(req, res){
    const id = req.params.id;
    const { Koodi, Laajuus, Nimi } = req.body;
    db.query("UPDATE opintojakso SET Koodi=?, Laajuus=?, Nimi=? WHERE idOpintojakso=?", [Koodi, Laajuus, Nimi, id],
        function(err,result) {
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Opintojakso updated successfully"
                });
            }
        }
    );
});

//DELETE an opintojakso
router.delete('/opintojaksot/:id', function(req, res){
    const id = req.params.id;

    db.query("DELETE FROM opintojakso WHERE idOpintojakso=?",[id],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Opintojakso deleted successfully"
                });
            }
        }
    );
});

//GET arviointi
router.get('/arvioinnit', function(req, res){
    db.query(
        "SELECT opiskelija.Etunimi, opiskelija.Sukunimi, opintojakso.Nimi AS Opintojakso, arviointi.Arvosana, arviointi.Paivamaara \
        FROM arviointi \
        JOIN opiskelija ON opiskelija.idOpiskelija = arviointi.idOpiskelija \
        JOIN opintojakso ON opintojakso.idOpintojakso = arviointi.idOpintojakso",
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        }
    );
});

//POST arviointi
router.post('/arvioinnit', function(req, res){
    const { Paivamaara, Arvosana, idOpintojakso, idOpiskelija } = req.body;
    db.query(
        "INSERT INTO arviointi (Paivamaara, Arvosana, idOpintojakso, idOpiskelija) VALUES (?, ?, ?, ?)",
        [Paivamaara, Arvosana, idOpintojakso, idOpiskelija],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Arviointi added successfully", id: result.insertId
                });
            }
        }
    );
});

//UPDATE an arviointi
router.put('/arvioinnit/:id', function(req, res){
    const id = req.params.id;
    const { Paivamaara, Arvosana, idOpintojakso, idOpiskelija } = req.body;

    db.query(
        "UPDATE arviointi SET Paivamaara=?, Arvosana=?, idOpintojakso=?, idOpiskelija=? WHERE idArviointi=?",
        [Paivamaara, Arvosana, idOpintojakso, idOpiskelija, id],
        function(err,result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Arviointi updated successfully"
                });
            }
        }
    );
});

//DELETE an arviointi
router.delete('/arvioinnit/:id', function(req, res){
    const id = req.params.id;

    db.query("DELETE FROM arviointi WHERE idArviointi=?",[id],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "Arviointi deleted successfully"
                });
            }
        }
    );
});

//POST User with encrypted pw
router.post('/users', function(req, res){
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query("INSERT INTO user (username, password) VALUES (?, ?)", [username, hashedPassword],
        function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    message: "User created successfully"
                });
            }
        }
    );
});

//GET
router.get('/users', function(req, res){
    db.query("SELECT * FROM user", function(err, result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    });
});


module.exports = router;