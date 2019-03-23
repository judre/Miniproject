var express = require('express');
var router = express.Router();
var userFacade = require('../facades/userFacade')
var blogFacade = require('../facades/blogFacade')
var mongoose = require('mongoose');


/* GET users listing. */
router.get('/users', async function (req, res, next) {
  res.json({ users : await userFacade.getAllUsers()});
});

/* GET user by userName */
router.get('/users/username=:userName', async function (req, res, next) {
  var userName = req.params.userName;
  res.json({ users : await userFacade.findByUsername(userName)});
});

/* GET user by id */
router.get('/users/id=:id', async function (req, res, next) {
  var id = req.params.id;
  res.json({ users : await userFacade.findById(id)});
});

/* POST creates user */
router.post('/user/add', async function( req, res, next){
  var body = req.body;
  var firstname = body.firstname;
  var lastname = body.lastname;
  var username = body.username;
  var password = body.password;
  var email = body.email;

  var user = await userFacade.addUser(firstname,lastname,username,password, email)
  res.json(user);
})





router.get('/error', function (req, res, next) {
  // for demonstration
  if (true) {
    //create error object 
    var err = new Error("UPPPPPS");
    // setting a new variable in err
    err.isJson = true;
    // can be thrown with --> throw err
    return next(err);
  }
});

module.exports = router;