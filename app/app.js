/**
 * Created by anupm on 2/20/2017.
 */
angular
    .module('contactManager',[
        'ui.router',
        'ngAlertify',
        'ipCookie'
    ])
    .config(ConfigurationFunction);

function ConfigurationFunction($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'contactController'
        })
        .state('registration', {
            url: '/registration',
            templateUrl: 'views/register.html',
            controller: 'contactController'
        })
        .state('forgot', {
            url: '/forgot',
            templateUrl: 'views/forgot.html',
            controller: 'contactController'
        })
        .state('dashboard', {
            abstract: true,
            url: '/dashboard/:username',
            templateUrl: 'views/dashboard.html',
            controller: 'contactController'
        })
        .state('dashboard.home', {
            url: '',
            templateUrl: 'views/home.html',
            controller: 'contactController'
        })
        .state('dashboard.add-contact', {
            url: '/add-contact',
            templateUrl: 'views/addContact.html',
            controller: 'contactController'
        })
        .state('dashboard.edit-contact', {
            url: '/edit-contact/:id',
            templateUrl: 'views/editContact.html',
            controller: 'contactController'
        })
        .state('dashboard.favourite', {
            url: '/favourites/',
            templateUrl: 'views/favourite.html',
            controller: 'contactController'
        })
        .state('dashboard.starred', {
            url: '/starred/',
            templateUrl: 'views/starred.html',
            controller: 'contactController'
        })
    ;

    $urlRouterProvider.otherwise('login');
}