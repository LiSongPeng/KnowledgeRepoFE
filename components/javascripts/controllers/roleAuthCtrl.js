/**
 * Created by Letg4 on 2017/9/8.
 */
var rAuthApp=angular.module('rAuthapp',['globalconfig','ui.router']);
rAuthApp.controller("rAuthCtrl",rAuthCtrl);
function rAuthCtrl($scope,$http,$location,$state,testURL) {
    $scope.authRoleId=$location.search().authId;
    $http({
        method:"GET",
        url:testURL+"role/getResources.form",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
        },
        params:{
            roleId:$scope.authRoleId,
        }
    }).then(function (response) {
        console.log(response);
        var reslist=response.data;
        for (var i in reslist){
            console.log($("#chx"+reslist[i]));
            $("#chx"+reslist[i]).prop("checked",true);
        }
    },function (data) {
        toastr.error("无法获取角色权限信息:"+data.status);
    });

    $scope.authSubmit=function () {
        var roleList=[];
        $("input[id^='chx']:checked").each(function(){
            roleList.push($(this).attr("id").slice(3));
        });
        $http({
            method:"POST",
            url:testURL+"role/setRoleRes.form",
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                roleId:$scope.authRoleId,
                resIds:JSON.stringify(roleList)
            })
        }).then(function (response) {
            toastr.success("角色授权成功");
            $state.go("roleList");
        },function (data) {
            toastr.error("角色授权失败:"+data.status);
        });
    }
    $scope.authBack=function () {
        $state.go("roleList");
    }
}