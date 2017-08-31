function mainController($scope,$http,baseURL) {
    $scope.currentPageURL="";
    $scope.homePage='';
    $scope.resList=[];
//				从服务器获取json权限数据
    $http.get(baseURL+'resTree.json').then(function (response) {
        $scope.resList=response.data.resList;
//					配置路由
        for (var i=0;i<$scope.resList.length;i++) {
            if($scope.resList[i].sType===1){
                stateProvider.state($scope.resList[i].sName,{
                    url: '/'+$scope.resList[i].id,
                    templateUrl: baseURL+$scope.resList[i].sUrl
                });
            }
        }
        $scope.$broadcast('refreshResTree',$scope.resList);
    });

    $scope.$on('pageChange',function (event,resource) {
        var path=[];
        for(var i=0;i<resource.pathdom.length;i++){
            path.push($(resource.pathdom[i]).html());
        }
        $scope.$broadcast('breadcrumbChange',path);
    });

}
function breadcrumbCtrl($scope) {
    $scope.urlPath=[];
    $scope.$on('breadcrumbChange',function (event,path) {
        $scope.urlPath=path.reverse();
    });
}
function navController($scope) {
    $scope.resTree=[];
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
    $scope.$on('refreshResTree',function (event,resList) {
        $scope.resTree=$scope.transData(eval(resList),'id','sParentId','child');
    });

    $scope.isLeaf = function(item){
        return !item.child || !item.child.length;
    };
    $scope.navClick=function (item,e) {
        if(item.sType===1){
            $('.nav-list li').removeClass('active');
            $(e.target).parents('li').addClass('active');
            var pathdom=$(e.target).parents('li').children('a').children('span');
            $scope.$emit('pageChange',{
                resitem: item,
                pathdom: pathdom
            });
        }
    };
}