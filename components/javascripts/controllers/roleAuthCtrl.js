/**
 * Created by Letg4 on 2017/9/8.
 */
var rAuthApp=angular.module('rAuthapp',['globalconfig','ui.router']);
rAuthApp.controller("rAuthCtrl",rAuthCtrl);
function rAuthCtrl($scope,$http,$location,$state,testURL) {
    $scope.authRoleId=$location.search().authId;
    $scope.transData=function (a, idStr, pidStr, chindrenStr){
        var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
        for(; i < len; i++){
            hash[a[i][id]] = a[i];
        }
        for(; j < len; j++){
            var aVal = a[j], hashVP = hash[aVal[pid]];
            if(hashVP){
                !hashVP[children] && (hashVP[children] = []);
                hashVP[children].push(aVal);
            }else{
                r.push(aVal);
            }
        }
        return r;
    };
    $scope.treeSetSelected=function (list,textattr,selattr,sellist) {
        for(var i in list){
            list[i].text=list[i][textattr];
            if ($.inArray(list[i][selattr],sellist)){
                list[i].state={checked:true};
            }
        }
    };
    $http({
        method: "GET",
        url: testURL+"role/getResources.form",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
        },
        params:{
            roleId:$scope.authRoleId
        }
    }).then(function (response) {
        $scope.restree=[];
        var resdata=response.data;
        var reslist=resdata.allRes;
        $scope.treeSetSelected(reslist,'sName','sId',resdata.roleRes);
        $scope.restree=$scope.transData(reslist,'sId','sParentId','nodes');
        $('#resourceTree').treeview({
            data:$scope.restree,
            showCheckbox:true,
            multiSelect:false,
            onNodeChecked: function (event,node) {
                // $('#resourceTree').treeview('selectNode',[node.nodeId,{silent:false}]);
                var children=node.nodes;
                for(var i in children){
                    $('#resourceTree').treeview('checkNode',[children[i].nodeId]);
                    // $('#resourceTree').treeview('selectNode',[children[i].nodeId,{silent:false}]);
                }
            },
            onNodeUnchecked:function (event,node) {
                // $('#resourceTree').treeview('unselectNode',[node.nodeId]);
                var children=node.nodes;
                for(var i in children){
                    $('#resourceTree').treeview('uncheckNode',[children[i].nodeId,{silent:false}]);
                    // $('#resourceTree').treeview('unselectNode',[children[i].nodeId,{silent:false}]);
                }
            }
        })
    },function (response) {
        toastr.error("获取资源列表失败");
    });


    $scope.authSubmit=function () {
        var roleresList=[];
        var treelen= $('#treeview-checkable  li').length;
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