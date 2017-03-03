/**
 * Created by anupm on 2/20/2017.
 */
var mongoose = require('mongoose');

//USER SCHEMA
var userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    pass:{
        type:String,
        required:true
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

var User = module.exports = mongoose.model('User',userSchema);

//Add User
module.exports.addUser = function (user,callback) {
    User.create(user,callback);
};

//Check if user exist
module.exports.checkUser = function (user,callback) {
    User.findOne(user,callback);
};

//Recover Password
module.exports.recoverPass = function (email,callback) {
    User.findOne(email,callback);
};

//GetUserById
module.exports.getUserById = function (id,callback) {
    User.findById(id,callback);
};