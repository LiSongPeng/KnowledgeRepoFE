// var ServUrl=(function () {
//     var URL="";
//     var fn={};
//     fn.getURL=function () {
//         return URL;
//     };
//     return fn;
// })();
var glconfig=angular.module('globalconfig',[]);
glconfig.factory('wscacheService',function () {
   var wsCache=new WebStorageCache({
       storage:'sessionStorage',
       exp:300
   });
   return wsCache;
});
glconfig.factory('sessionInjector',function (wscacheService) {
    // var wsCache=new WebStorageCache({
    //     storage:'sessionStorage',
    //     exp:300
    // });
    var wsCache=wscacheService;
    return{
        request:function (config) {
            console.log("拦截器拦截request请求:");
            console.log(config);
            config.headers = config.headers||{};
            if(window.sessionStorage.getItem("currUser")===null){
                alert("未登录，跳转至登录页面");
                config.method="get";
                config.cache={
                    get:function () {
                        return null;
                    }
                };
                window.location.href="index.html";
            }else {
                var currUser=wsCache.get("currUser");
                console.log("wscache已get");
                console.log(currUser);
                if(currUser!=null){
                    currUser=angular.fromJson(currUser);
                    config.headers['Current-UserId']=currUser.id;
                    console.log(config.headers);
                    wsCache.touch("currUser",300);
                    return config;
                }else {
                    alert("登录超时，请重新登录");
                    config.method="get";
                    config.cache={
                        get:function () {
                            return null;
                        }
                    };
                    window.location.href="index.html";

            }
            }
        },
        response:function (response) {
            return response;
        }
    }
});
glconfig.config(function ($httpProvider) {
    // var currUserStr=window.sessionStorage.getItem("currUser");
    // if(currUserStr===null){
    // } else {
    //     var currUser=JSON.parse(currUserStr);
    //     $httpProvider.defaults.headers.common = { 'Current-UserId' : currUser.id }
    // }
    $httpProvider.interceptors.push('sessionInjector');
});