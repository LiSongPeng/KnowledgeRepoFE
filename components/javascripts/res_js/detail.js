/**
 * Created by Letg4 on 2017/9/2.
 */
var detail = angular.module("detail", []);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

var detailController = detail.controller("detailController", ["$scope", "$http", function ($scope, $http) {
    var detailId = getQueryString("detailId");
    if (!detailId) {
        toastr.error("没有输入查询的知识ID");
        return;
    }

    $http({
        method: "GET",
        url: "http://localhost:8080/knowledgeRepo/repo/getKnowledgeDetail.form?id=" + detailId,
    }).then(function successCallback(response) {
        console.log(response.data.data);
        if (response.data.flag == 200) {
            $scope.response = response.data.data;
            $scope.response.createTime = new Date($scope.response.createTime).toLocaleString();
            $scope.response.kApprTime = new Date($scope.response.kApprTime).toLocaleString();
        } else {
            toastr.info("未查找到结果");
        }

    }, function errorCallback(response) {
        toastr.error("数据加载失败");
    });
}]);