/**
 * Created by Letg4 on 2017/9/5.
 */

var userAdd=angular.module('userAdd',['globalconfig']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
userAdd.controller("userAddCtrl",userAddCtrl);
function userAddCtrl ($scope,$http,testURL) {
    $scope.user={};
    $scope.submitAdd=function () {
       if (!$("#userAddForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
        $http({
            method:"POST",
            url:testURL+"user/add.form",
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                uName:$scope.user.uName,
                uPassword:$scope.user.uPassword,
                uDescription:$scope.user.uDescription
            })
        }).then(function (data) {
            $scope.user={};
            toastr.success("创建用户成功");
            console.log(data);
        },function (data) {
            alert("失败:");
            console.log(data);
        });
    }
}

