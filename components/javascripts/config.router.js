var app=angular.module('mainRouter',['ui.router','lazyloadConfig']);
// app.provider('routerConfig',['$stateProvider','$urlRouterProvider','$ocLazyLoaderProvider','Module_config',function ($stateProvider,$urlRouterProvider,$ocLazyLoaderProvider,Modules_Config) {
//     console(123);
//     this.$get=function () {
//         return {
//             setRouteState: function () {
//
//             }
//         }
//     };
// }]);

app.config(function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug:true,
        events:false,
        modules:Modules_Config
    });
    $urlRouterProvider.otherwise("/home");
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state("search",{
            url:"/search.html",
            templateUrl:"search.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load("jqGrid");
                }
            }
        })
        .state("userList",{
            url:"/userList.html",
            templateUrl:"userList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["jqGrid"]);
                }
            }
        })
});