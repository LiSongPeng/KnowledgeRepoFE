function mainController($scope,$http,baseURL) {
    $scope.resList=[];
//				从服务器获取json权限数据
    $http.get(baseURL+'resTree.json').then(function (response) {
        $scope.resList=response.data.resList;
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
function navController($scope,$rootScope) {
    $scope.resTree=[];
    $scope.resList=[];
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
    $scope.$on('$stateChangeStart',function (evt, toState, toParams, fromState, fromParams) {
        console.log("123123");
        alert(123);
        console.log(evt);
        console.log(toState);
        console.log(toParams);
    });
    $scope.$on('refreshResTree',function (event,resList) {
        $scope.resList=resList;
        $scope.resTree=$scope.transData(eval(resList),'id','sParentId','child');
    });

    $scope.sliceUrl=function (url){
        if (url===null){
            return;
        }
       var suburl = url.slice(0,url.lastIndexOf('.'));
       if (suburl.lastIndexOf('/')!=-1){
        suburl = suburl.slice(suburl.lastIndexOf('/')+1,suburl.length);
       }
       if(suburl.lastIndexOf('\\')!=-1){
        suburl = suburl.slice(suburl.lastIndexOf('\\')+1,suburl.length);
       }
        return suburl;
    };

    $scope.isLeaf = function(item){
        for(var i=0;i<$scope.resList.length;i++){
            if(item.id===$scope.resList[i].sParentId){
                return false;
            }
        }
        return true;
    };
    $scope.navClick=function (item,e) {
        $('.nav-list li').removeClass('active');
        $(e.target).parents('li').addClass('active');
        var pathdom=$(e.target).parents('li').children('a').children('span');
        $scope.$emit('pageChange',{
            resitem: item,
            pathdom: pathdom
        });
    };
}