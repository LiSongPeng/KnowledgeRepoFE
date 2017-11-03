/**
 * Created by Letg4 on 2017/9/5.
 */

var passModify=angular.module('passModify',['globalconfig','ui.router']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });

passModify.controller("passModifyCtrl",passModifyCtrl);
function passModifyCtrl ($scope,$http,$state,$stateParams) {

    $(function() {
        // validate form
        var tform = $("#passModifyForm");
        tform.bootstrapValidator({
            fields:{
                // originPassword:{
                //     // 定义每个验证规则
                //     validators: {
                //         notEmpty: {message: '请输入原密码'},
                //         threshold : 6,
                //         remote:{
                //             url: BASE_URL+'user/userPass/checkPass.form',//验证地址
                //             message: '原密码错误',//提示消息
                //             headers:   {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
                //             delay :  2000,//
                //             type: 'POST'//请求方式
                //         }
                //     }
                // },
                newPassword:{
                    validators:{
                        notEmpty: {message: '新密码不能为空'},
                        stringLength: {min:6,max:20,message: '新密码长度在6-20之间'}
                    }
                },
                confirmPassword:{
                    validators:{
                        identical: {
                            field: 'newPassword',
                            message: '两次输入密码不一致'
                        }
                    }
                }
            }
        });
        // 修复bootstrap validator重复向服务端提交bug
        tform.on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
        });

    });



    $scope.user={};
    console.log($stateParams.originPassword);
    $scope.user.originPassword=$stateParams.originPassword;
    $scope.title="修改密码";


    $scope.goBack= function () {
        $state.go('用户管理');
    };

    $scope.submitAdd=function () {
        $('#passModifyForm').bootstrapValidator('validate');
       if (!$("#passModifyForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="user/userPass/modifyPass.form";
       $scope.currUser=JSON.parse(window.sessionStorage.getItem("currUser"));
        $http({
            method:"POST",
            url:BASE_URL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({

                originPassword:$scope.user.originPassword,
                newPassword:$scope.user.newPassword
            })
        }).then(function (data) {
            if(data.data.valid===true){
                toastr.success("修改密码成功");
                $scope.user={};
                $state.go('用户管理');
            }else {
                toastr.error("修改密码失败");
            }
        },function (data) {
            toastr.error("修改密码出错");
        });
    }
}

