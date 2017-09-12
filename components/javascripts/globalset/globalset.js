// var ServUrl=(function () {
//     var URL="";
//     var fn={};
//     fn.getURL=function () {
//         return URL;
//     };
//     return fn;
// })();
var glconfig=angular.module('globalconfig',[]);
glconfig.config(function ($httpProvider) {
    var currUid=window.sessionStorage.getItem("currUser");
    var currUser=JSON.parse(currUid);
    $httpProvider.defaults.headers.common = { 'Current-UserId' : currUser.id }
});