var express = require('express');
var router = express.Router();

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


module.exports = router;