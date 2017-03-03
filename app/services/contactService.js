/**
 * Created by anupm on 2/21/2017.
 */
angular
    .module('contactManager')
    .service("contactService",['ipCookie','$http','$location',function (ipCookie,$http,$location) {
    //authenticating the user
    this.checkUserExist = function (user) {
        //make post request with user object which has username and password
        $http.post("/api/login", user).then(function(data, status) {
            //data will be null if there is no such user
            if(data.data === null){
                alertify.delay(4000).error("Invalid Credentials !!");
            }
            else{
                alertify.delay(4000).success("Login Successfull !!");
                var key = "id";
                var value = data.data._id;
                ipCookie(key, value, { expires: 7 });
                var replaced = data.data.name.toLowerCase().replace(/ /g, '-');
                $location.path('/dashboard/'+replaced);
            }
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //registering the user
    this.registerUser = function (user) {
        //making post request with user object to register the user
        $http.post("/api/users", user).then(function(data, status) {
            //data will be ok if it successfully added new user
            alertify.delay(4000).success("Successfully Added user !!");
            var key = "id";
            var value = data.data._id;
            ipCookie(key, value, { expires: 7 });
            var replaced = data.data.name.toLowerCase().replace(/ /g, '-');
            $location.path('/dashboard/'+replaced);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //recovering password
    this.recoverPassword = function (email) {
        //making http post request alongwith email object to get password of that email
        $http.post("/api/forgot",{email : email}).then(function(data, status) {
            //data will be the object which has the posted email assigned to it
            alertify.delay(10000).success("Your Password is : " + data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //checking logged user
    this.checkLoggedUser = function (id,callback) {
        if(id === undefined || id === null){
            $location.path('/login');
        }
        //making http get request with the id in the cookie
        $http.get("/api/users/"+id).then(function(data, status) {
            //data is the user object from the database with all information
            callback(data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //getting all the contacts of the user
    this.getAllContacts = function (id,callback) {
        //making http request with the id of logged in user to get all the contacts linked with that account
        $http.get("/api/contacts/"+id).then(function(data, status) {
            //data is the array of all the contacts linked with logged in users account
            callback(data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //getting all the favourite contacts
    this.getFavouriteContacts = function (id,callback) {
        //making http get request with user id in the url
        $http.get("/api/contacts/favourite/"+id).then(function(data, status) {
            //data consists of all the contacts which are favourites
            callback(data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //getting all the starred contacts
    this.getStarredContacts = function (id,callback) {
        //making http get request with the user id in the url
        $http.get("/api/contacts/starred/"+id).then(function(data, status) {
            //data consists of all the contacts which are favourites
            callback(data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //adding new contact
    this.addContact = function (contact,callback) {
        //making post request with the contact object to add the contact
        $http.post("/api/contacts",contact).then(function(data, status) {
            alertify.delay(10000).success("New Contact Updated");
            callback();
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //deleting contact by passing id of the contact to delete
    this.deleteContact = function (id,callback) {
        //making http delete request along with the id of the contact to delete
        $http.delete('/api/contacts/'+id) .then(function (response) {
            callback();
        }, function (err) {
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //getting the contact to edit
    this.getContactToEdit = function (userId,contactId,callback) {
        //making http post request with passing the user id, contact id so that we can get contact to be edited
        var obj = {user_id:userId,_id:contactId};
        $http.post("/api/contact/edit",obj).then(function(data, status) {
            callback(data.data);
        },function(err){
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    };
    //edit the contact
    this.updateContact = function (id,contact,callback) {
        //making http put request to update the particular contact with id
        $http.put('/api/contact/edit/'+id,contact) .then(function (response) {
            callback();
        }, function (err) {
            //Error
            console.log(err);
            alertify.delay(4000).error("There Was Some Error. Please Try Again !!");
        });
    }
}]);
