/**
 * Created by Letg4 on 2017/9/5.
 */

var sysConfig=angular.module('systemConfig',['globalconfig','ui.router',["select2","toastr"]]);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
sysConfig.controller("configCtrl",configCtrl);
function configCtrl ($scope,$http,$state,$location,$cookieStore) {
    var timeSlct=$('#logOutTime');
    timeSlct.select2({
        minimumResultsForSearch: -1,
        width:'50%'
    });
    var cookielogtime=$cookieStore.get("logOutTime");
    if(cookielogtime){
        switch (Number(cookielogtime)){
            case 300:
                timeSlct.val(300).trigger('change');
                break;
            case 900:
                timeSlct.val(900).trigger('change');
                break;
            case 1800:
                timeSlct.val(1800).trigger('change');
                break;
            default:
                timeSlct.val(900).trigger('change');
        }
    }


    $scope.goBack= function () {
        history.back();
    };

    $scope.submitAdd=function () {
        $cookieStore.put("logOutTime",timeSlct.val());
        toastr.success("保存成功！");
        history.back();
    }
}

