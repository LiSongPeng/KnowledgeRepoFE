/**
 * Created by Letg4 on 2017/8/28.
 */
var indexapp=angular.module('indexapp',['mainRouter','globalconfig']);
indexapp.config(function ($stateProvider,$urlRouterProvider) {
    // $stateProvider
    //     .state('home', {
    //         url: '/home',
    //         templateUrl: 'home.html'
    //     });
    // $urlRouterProvider.otherwise('/home');
});
indexapp.controller('mainCtrl',mainController);
indexapp.controller('navListCtrl',['$scope',navController]);
indexapp.controller('breadcrumbCtrl',['$scope',breadcrumbCtrl]);