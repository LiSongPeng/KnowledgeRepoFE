/**
 * Created by Letg4 on 2017/9/5.
 */

var passValidate=angular.module('passValidate',['globalconfig','ui.router']);
// userAdd.config(function($httpProvider){
//     $httpProvider.defaults.headers.post = {"Content-Type": "application/x-www-form-urlencoded"};
// });

passValidate.controller("passValidateCtrl",passValidateCtrl);
function passValidateCtrl ($scope,$http,$state) {

    $(function() {
        // validate form
        var tform = $("#passValidateForm");
        tform.bootstrapValidator({
            fields:{
                originPassword:{
                    // 定义每个验证规则
                    validators: {
                        notEmpty: {message: '请输入原密码'},
                        threshold : 6,
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
    $scope.title="修改密码";


    $scope.goBack= function () {
        $state.go('用户管理');
    };

    $scope.submitAdd=function () {
        $('#passValidateForm').bootstrapValidator('validate');
       if (!$("#passValidateForm").data("bootstrapValidator").isValid()){
            toastr.warning("输入不合法");
           return;
       }
       var tourl="user/userPass/checkPass.form";
       $scope.currUser=JSON.parse(window.sessionStorage.getItem("currUser"));
        $http({
            method:"POST",
            url:BASE_URL+tourl,
            headers : {
                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
            },
            data:$.param({
                originPassword:$scope.user.originPassword
            })
        }).then(function (data) {
            console.log(data);
            if(data.data.valid===true){
                toastr.success("验证成功");
                $state.go("密码修改修改",{originPassword:$scope.user.originPassword});
            }else  if(data.data.valid===false){
                toastr.error("原密码不正确,请重试");
            }else {
                toastr.error("验证密码错误");
            }
            $scope.user={};
        },function (data) {
            toastr.error("验证密码失败");
        });
    }
}

