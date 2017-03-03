/**
 * Created by anupm on 2/21/2017.
 */
angular
    .module('contactManager')
    .controller('contactController',['$scope','$location','ipCookie','contactService','$stateParams',function ($scope,$location,ipCookie,contactService,$stateParams) {
        //store the username in url
        $scope.url_name = $stateParams.username;
        //authenticating user
        $scope.checkUser = function () {
            contactService.checkUserExist($scope.user);
        };
        //register new user
        $scope.registerUser = function () {
            contactService.registerUser($scope.register);
        };
        //forgot password recovery
        $scope.recoverPass = function () {
            contactService.recoverPassword($scope.recover_email)
        };
        //checking logged user
        $scope.check_logged_user = function () {
            //getting the id from cookie
            var id = ipCookie("id");
            $scope.user_id = id;
            contactService.checkLoggedUser(id, function (res) {
                $scope.anup = res.name;
            });
        };
        //get all the contacts
        $scope.getContacts = function(){
            contactService.getAllContacts($scope.user_id,function(response){
               $scope.contacts = response;
            });
        };
        //add contact
        $scope.addContact = function () {
            $scope.add_contact.user_id = $scope.user_id;
            contactService.addContact($scope.add_contact,function(){
                $location.path('/dashboard/'+$scope.url_name);
            });
        };
        //delete contact
        $scope.deleteContact = function (deleteID) {
        contactService.deleteContact(deleteID,function () {
            contactService.getAllContacts($scope.user_id,function(response){
                $scope.contacts = response;
            });
        });
        };
        //edit contact
        $scope.editContact = function (id) {
            $location.path('/dashboard/'+$scope.url_name+'/edit-contact/'+id);
        };
        //load details for contact to edit
        $scope.loadDetails = function () {
            contactService.getContactToEdit($scope.user_id,$stateParams.id,function(response){
                $scope.contactToEdit = response;
            });
        };
        //update the contact
        $scope.updateContact = function () {
            console.log($scope.contactToEdit);
            contactService.updateContact($stateParams.id,$scope.contactToEdit,function () {
                alertify.delay(10000).success("Contact Updated !!");
                $location.path('/dashboard/'+$scope.url_name);
                //load contacts again
                contactService.getAllContacts($scope.user_id,function(response){
                    $scope.contacts = response;
                });
            });
        };
        //logout the user
        $scope.logout = function () {
            $scope.user_id = null;
            ipCookie.remove('id');
            alertify.delay(4000).success("Successfully Logged Out !!");
            $location.path('/login');
        };
        //make contact favourite
        $scope.make_fav = function (contact) {
            contact.fav = "true";
            contactService.updateContact(contact._id,contact,function () {
                alertify.delay(5000).success("Marked As Favourite !!");
                $location.path('/dashboard/'+$scope.url_name);
                //load contacts again
                contactService.getAllContacts($scope.user_id,function(response){
                    $scope.contacts = response;
                });
            });
        }
        //remove contact as favourite
        $scope.remove_fav = function (contact) {
            contact.fav = "false";
            contactService.updateContact(contact._id,contact,function () {
                alertify.delay(5000).success("Removed From Favourite !!");
                $location.path('/dashboard/'+$scope.url_name);
                //load contacts again
                contactService.getAllContacts($scope.user_id,function(response){
                    $scope.contacts = response;
                });
            });
        }
        //make contact starred
        $scope.make_starred = function (contact) {
            contact.starred = "true";
            contactService.updateContact(contact._id,contact,function () {
                alertify.delay(10000).success("Marked As Starred !!");
                $location.path('/dashboard/'+$scope.url_name);
                //load contacts again
                contactService.getAllContacts($scope.user_id,function(response){
                    $scope.contacts = response;
                });
            });
        }
        //remove contact as starred
        $scope.remove_starred = function (contact) {
            contact.starred = "false";
            contactService.updateContact(contact._id,contact,function () {
                alertify.delay(10000).success("Removed From Starred !!");
                $location.path('/dashboard/'+$scope.url_name);
                //load contacts again
                contactService.getAllContacts($scope.user_id,function(response){
                    $scope.contacts = response;
                });
            });
        }
        //loads all favourite contacts
        $scope.loadFavourite = function(){
            contactService.getFavouriteContacts($scope.user_id,function(response){
                $scope.contacts = response;
            });
        };
        //loads all starred contacts
        $scope.loadStarred = function(){
            contactService.getStarredContacts($scope.user_id,function(response){
                $scope.contacts = response;
            });
        };
    }]);