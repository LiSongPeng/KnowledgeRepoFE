/**
 * Created by Letg4 on 2017/9/5.
 */

var userAdd=angular.module('userAdd',['globalconfig','ui.router']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
userAdd.controller("userAddCtrl",userAddCtrl);
function userAddCtrl ($scope,$http,$state,$location,testURL) {
    $scope.user={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建用户";
    alert($scope.editflag);
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑用户";
        console.log("sendhttp");
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: testURL + "user/query.form",
            headers: {
                'Content-Type': "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data: $.param({
                id:$scope.editId,
                currentPage:1,
                pageSize:1
            })
        }).then(function success(response){
            console.log(response);
            $scope.user=response.data.content[0];
            toastr.success("获取用户信息成功");
        },function error(response) {
            toastr.error("获取要编辑的用户信息失败,错误代码:"+response.status);
        })
        console.log("sendhttp");
    }
    $scope.submitAdd=function () {
       if (!$("#userAddForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="user/add.form";
       if ($scope.editflag==="true"){
           tourl="user/update.form";
       }
        $http({
            method:"POST",
            url:testURL+tourl,
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
            if ($scope.editflag==="true"){
                toastr.success("修改用户成功");
            }
            toastr.success("创建用户成功");
            console.log(data);
        },function (data) {
            toastr.error("创建用户失败:"+data.status);
            console.log(data);
        });
    }
}

