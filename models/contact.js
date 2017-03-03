/**
 * Created by anupm on 2/21/2017.
 */
var mongoose = require('mongoose');

//CONTACT SCHEMA
var contactSchema = mongoose.Schema({
    user_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    bdate:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    fav:{
        type:String,
        default:false
    },
    starred:{
        type:String,
        default:false
    },
    create_date:{
        type:Date,
        default:Date.now
    }
});

var Contact = module.exports = mongoose.model('Contact',contactSchema);

//Get Contacts
module.exports.getContacts = function(user_id,callback){
    Contact.find(user_id, callback);
};

//Add Contact
module.exports.addContact = function(contact, callback){
    Contact.create(contact, callback);
};

//Delete Contact
module.exports.deleteContact = function(id, callback){
    var query = {_id:id};
    Contact.remove(query, callback);
};

//Get Contact To Edit
module.exports.getContactToEdit = function (contact,callback) {
    Contact.findOne(contact,callback);
};

//Update Contact
module.exports.updateContact = function (id, contact, options, callback) {
    var query = {_id:id};
    var update = contact;
    Contact.findOneAndUpdate(query,update,options,callback);
};

//Get Favourite Contacts
module.exports.getFavouriteContacts = function(contact,callback){
    Contact.find(contact, callback);
};

//Get Starred Contacts
module.exports.getStarredContacts = function(contact,callback){
    Contact.find(contact, callback);
};