/**
 * Created by anupm on 2/20/2017.
 */

//Express
var express = require('express');
var app = express();

//Body Parser
var bodyParser = require('body-parser');

//Mongoose
var mongoose = require('mongoose');

//Connect to MongoDb Database
mongoose.connect('mongodb://anup:Mothermary99@ds157469.mlab.com:57469/contact-manager');
var db = mongoose.connection;

//Getting User Model
var User = require('./models/user');
var Contact = require('./models/contact');

//Creating middleware for static files
app.use(express.static(__dirname+'/app'));

app.use(bodyParser.json());

app.get('/',function (req,res) {
    res.send("App Started");
});

//REST API

//save user
app.post("/api/users",function (req,res) {
    var user = req.body;
    User.addUser(user,function (err,user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//check if user exist
app.post("/api/login",function (req,res) {
    var username = req.body.user;
    var password = req.body.pass;
    User.checkUser({user:username,pass:password},function (err, user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//recover password
app.post("/api/forgot",function (req,res) {
    var email = req.body.email;
    User.recoverPass({email:email},function (err, user) {
        if(err){
            throw  err;
        }
        res.json(user.pass);
    })
});

//Get User Details
app.get("/api/users/:_id",function (req,res) {
    User.getUserById(req.params._id,function (err,user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//Get All Contacts
app.get("/api/contacts/:_id",function (req,res) {
    Contact.getContacts({user_id:req.params._id},function (err,user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//Get Favourite Contacts
app.get("/api/contacts/favourite/:_id",function (req,res) {
    Contact.getFavouriteContacts({user_id:req.params._id,fav:"true"},function (err,user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//Get Starred Contacts
app.get("/api/contacts/starred/:_id",function (req,res) {
    Contact.getStarredContacts({user_id:req.params._id,starred:"true"},function (err,user) {
        if(err){
            throw  err;
        }
        res.json(user);
    });
});

//Add Contact
app.post("/api/contacts",function (req,res) {
    var contact = req.body;
    Contact.addContact(contact,function (err, contact) {
        if(err){
            throw  err;
        }
        res.json(contact);
    })
});

//Delete Contact
app.delete("/api/contacts/:_id",function (req,res) {
    var id = req.params._id;
    Contact.deleteContact(id, function (err,contact) {
        if(err){
            throw  err;
        }
        res.json(contact);
    });
});

//Get Contact To Edit
app.post("/api/contact/edit",function (req,res) {
    var contact = req.body;
    Contact.getContactToEdit(contact,function (err, contact) {
        if(err){
            throw  err;
        }
        res.json(contact);
    })
});

//Update Contact
app.put("/api/contact/edit/:_id",function (req,res) {
    var id = req.params._id;
    var contact = req.body;
    Contact.updateContact(id, contact, {}, function (err,contact) {
        if(err){
            throw  err;
        }
        res.json(contact);
    });
});

//Listening on port 3000
app.listen(3000);
console.log("Server Started.. ");
console.log("listening on port 3000");