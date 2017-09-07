/**
 * Created by Letg4 on 2017/9/5.
 */

var userAdd=angular.module('resourceAdd',['globalconfig','ui.router']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
userAdd.controller("resourceAddCtrl",resourceAddCtrl);
function resourceAddCtrl ($scope,$http,$state,$location,testURL) {
    $scope.resource={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建资源";
    alert($scope.editflag);
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑资源";
        console.log("sendhttp");
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: testURL + "resource/selectById.form",
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
            $scope.resource=response.data;
            toastr.success("获取资源信息成功");
        },function error(response) {
            toastr.error("获取要编辑的资源信息失败,错误代码:"+response.status);
            $state.go("resourceList");
        });
        console.log("sendhttp");
    }
    $scope.submitAdd=function () {

       var tourl="resource/add.form";
       if ($scope.editflag==="true"){
           tourl="resource/update.form";
       }
        $http({
            method:"POST",
            url:testURL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                id:$scope.resource.id,
                sName:$scope.resource.sName,
                sUrl:$scope.resource.sUrl,
                sType:$scope.resource.sType,
                sIcon:$scope.resource.sIcon
            })
        }).then(function (data) {
            $scope.resource={};
            if ($scope.editflag==="true"){
                toastr.success("修改资源成功");
                $state.go("resourceList");
            }else{
                toastr.success("创建资源成功");
            }
        },function (data) {
            toastr.error("创建资源失败:"+data.status);
        });
    }
}

