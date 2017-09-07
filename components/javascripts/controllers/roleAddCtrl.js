/**
 * Created by Letg4 on 2017/9/5.
 */

var roleAdd=angular.module('roleAdd',['globalconfig','ui.router']);
// roleAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });
roleAdd.controller("roleAddCtrl",roleAddCtrl);
function roleAddCtrl ($scope,$http,$state,$location,testURL) {
    $scope.role={};
    $scope.editflag=$location.search().edit||false;
    $scope.title="新建角色";
    alert($scope.editflag);
    if ($scope.editflag==="true"||$scope.editflag===true){
        $scope.title="编辑角色";
        console.log("sendhttp");
        $scope.editId=$location.search().editId;
        $http({
            method: "POST",
            url: testURL + "role/query.form",
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
            $scope.role=response.data.content[0];
            toastr.success("获取角色信息成功");
        },function error(response) {
            toastr.error("获取要编辑的角色信息失败,错误代码:"+response.status);
        })
        console.log("sendhttp");
    }
    $scope.submitAdd=function () {
       if (!$("#roleAddForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="role/add.form";
       if ($scope.editflag==="true"){
           tourl="role/update.form";
       }
        $http({
            method:"POST",
            url:testURL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                id:$scope.role.id,
                rName:$scope.role.rName,
                rDescription:$scope.role.rDescription
            })
        }).then(function (data) {
            $scope.role={};
            if ($scope.editflag==="true"){
                toastr.success("修改角色成功");
                $state.go("roleList");
            }else{
                toastr.success("创建角色成功");
            }
        },function (data) {
            toastr.error("创建角色失败:"+data.status);
        });
    }
}

