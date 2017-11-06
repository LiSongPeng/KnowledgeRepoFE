// var ServUrl=(function () {
//     var URL="";
//     var fn={};
//     fn.getURL=function () {
//         return URL;
//     };
//     return fn;
// })();
var glconfig=angular.module('globalconfig',['ngCookies']);
glconfig.factory('wscacheService',['$cookieStore',function ($cookieStore) {
    var wsExp=$cookieStore.get("logOutTime");
    var wsCache=new WebStorageCache({
       storage:'sessionStorage',
       exp:Number(wsExp)||900
    });
    var wsService={
        set:function (key,val,exp) {
            return wsCache.set(key,val,exp)
        },
        get:function (key) {
            return wsCache.get(key);
        },
        delete:function (key) {
            return wsCache.delete(key);
        },
        clear:function () {
            wsCache.clear();
        },
        replace:function (key,value,option) {
            wsCache.replace(key,value,option);
        },
        touch:function () {

            wsCache.touch(arguments[0],arguments[1]||Number($cookieStore.get("logOutTime"))||900);
        }
    };
    return wsService;
}]);
glconfig.factory('sessionInjector',function (wscacheService,$cookieStore) {
    // var wsCache=new WebStorageCache({
    //     storage:'sessionStorage',
    //     exp:300
    // });
    var wsCache=wscacheService;
    return{
        request:function (config) {

            config.headers = config.headers||{};
            if(window.sessionStorage.getItem("currUser")===null){
                alert("未登录，跳转至登录页面");
                config.method="get";
                config.cache={
                    get:function () {
                        return null;
                    }
                };
                // window.location.href="index.html";
            }else {
                var currUser=wsCache.get("currUser");
                if(currUser!=null){
                    currUser=angular.fromJson(currUser);
                    config.headers['Current-UserId']=currUser.id;
                    wsCache.touch("currUser");
                    return config;
                }else {
                    alert("登录超时，请重新登录");
                    config.method="get";
                    config.cache={
                        get:function () {
                            return null;
                        }
                    };
                    // window.location.href="index.html";
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
glconfig.run(['$cookieStore','wscacheService',function ($cookieStore,wscacheService) {
    $.ajaxSetup({
        beforeSend:function (xhr) {
            var wsCache=wscacheService;
            if(window.sessionStorage.getItem("currUser")===null){
                alert("未登录，跳转至登录页面");
                window.location.href="index.html";
                return false;
            }else {
                var currUser = wsCache.get("currUser");
                if (currUser != null) {
                    currUser = angular.fromJson(currUser);
                    xhr.setRequestHeader('Current-UserId',currUser.id);
                    wsCache.touch("currUser");
                } else {
                    alert("ajax:登录超时，请重新登录");
                    window.location.href = "index.html";
                    return false;
                }
            }
        }
    });
}]);