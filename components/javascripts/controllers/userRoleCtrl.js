/**
 * Created by Letg4 on 2017/9/8.
 */
var userRoleApp=angular.module('userRoleApp',['ui.router','globalconfig']);
userRoleApp.controller("userRoleCtrl",userRoleCtrl);
function userRoleCtrl($scope,$state,$http,testURL,$location) {
    $scope.editId=$location.search().editId;
    $http({
        method: "GET",
        url: testURL+"role/getRoleOption.form"
    }).then(function (response) {
        $scope.roletree=[];
        var rolelist=response.data;
        for(var i in rolelist){
            var role={
                text:rolelist[i].rName,
                roleId:rolelist[i].id,
                icon: "glyphicon glyphicon-unchecked",
                selectedIcon: "glyphicon glyphicon-check",
                state:{
                    selected: false
                }
            };
            $scope.roletree.push(role);

            $http({
                method: "POST",
                url: testURL+"role/getUserRole.form",
                headers: {
                    'Content-Type': "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
                },
                data: $.param({
                    uid:$scope.editId
                })
            }).then(function (response) {
                for(var i in $scope.roletree){
                    for (var j in response.data){
                       if($scope.roletree[i].roleId==response.data[j]){
                           $scope.roletree[i].state.selected=true;
                       }
                    }
                }
                $('#roleTree').treeview({
                    data:$scope.roletree,
                    multiSelect:true
                })
            },function (response) {
                toastr.error("获取用户角色失败");
            });
        }
    },function (response) {
        toastr.error("获取角色列表失败");
    });



    $scope.userroleSubmit=function () {
        var sellist=$('#roleTree').treeview('getSelected');
        var rids=[];
        for(var i in sellist){
            rids.push(sellist[i].roleId);
        }
        $http({
            method:"POST",
            url:testURL+"user/setUserRole.form",
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                uid:$scope.editId,
                rids: JSON.stringify(rids)
            })
        }).then(function (data) {
            toastr.success("用户角色设置成功");
            $state.go("userList");
        },function (data) {
            toastr.error("用户角色设置失败");
        });
    };

    $scope.userroleBack=function () {
        $state.go("userList");
    };

}