var detail = angular.module("detail", []);

function getParameter(name) {
    var str = window.location.href;
    return str.substr(str.indexOf(name) + name.length + 1, str.length);
}

var detailController = detail.controller("detailController", ["$scope", "$http", function ($scope, $http) {
    var detailId = getParameter("detailId");
    if (!detailId) {
        toastr.error("没有输入查询的知识ID");
        return;
    }

    $http({
        method: "GET",
        url: "http://localhost:8080/knowledgeRepo/repo/getKnowledgeDetail.form?id=" + detailId,
    }).then(function successCallback(response) {
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