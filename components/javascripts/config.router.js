var app=angular.module('mainRouter',['ui.router','lazyloadConfig']);


app.config(function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,Modules_Config) {
    $ocLazyLoadProvider.config({
        debug:true,
        events:false,
        modules:Modules_Config
    });
    $urlRouterProvider.otherwise("/search.html");
    $stateProvider

        .state("knowledgeList",{
            url:"/knowledgeRepo/knowledgeList.html",
            templateUrl:"knowledgeRepo/knowledgeList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load("jqGrid");
                }
            }
        })
        .state("knowledgeList2",{
            url:"/knowledgeRepo/knowledgeList2.html",
            templateUrl:"knowledgeRepo/knowledgeList2.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load("jqGrid");
                }
            }
        })

        .state("knowledgeAdd",{
        url:"/knowledgeRepo/knowledgeAdd.html",
        templateUrl:"knowledgeRepo/knowledgeAdd.html",
        resolve:{
            deps:function ($ocLazyLoad) {
                return $ocLazyLoad.load(["res_knowledgeAdd"]);
            }
        }

    })
        .state("knowledgeEdit",{
            url:"/knowledgeRepo/knowledgeEdit.html",
            templateUrl:"knowledgeRepo/knowledgeEdit.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_knowledgeAdd"]);
                }
            }

        })

        .state("knowledgeApprova",{
            url:"/knowledgeRepo/knowledgeApprova.html",
            templateUrl:"knowledgeRepo/knowledgeApprova.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["res_knowledgeAdd"]);
                }
            }

        })

        .state("userList",{
            url:"/user/userList.html",
            templateUrl:"user/userList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["jqGrid","res_userList"]);
                }
            }
        })
        .state("search",{
            url:"/search.html",
            templateUrl:"search.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_search"]);
                }
            }
        })
        .state("knowledgeDetail",{
            url:"/knowledgeDetail.html",
            templateUrl:"knowledgeDetail.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_knowledgeDetail"])
                }
            }
        })
        .state("userAdd",{
            url:"/user/userAdd.html",
            templateUrl:"user/userAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["select2","toastr","res_userAdd"])
                }
            }
        })
        .state("resourceList",{
            url:"/resource/resourceList.html",
            templateUrl:"resource/resourceList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["jqGrid","res_resourceList"])
                }
            }
        }).state("roleList",{
            url:"/role/roleList.html",
            templateUrl:"role/roleList.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["jqGrid","res_roleList"])
                }
            }
        })
        .state("resourceAdd",{
            url:"/resource/resourceAdd.html",
            templateUrl:"resource/resourceAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_resourceAdd"])
                }
            }
        })
        .state("roleAdd",{
            url:"/role/roleAdd.html",
            templateUrl:"role/roleAdd.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","res_roleAdd"])
                }
            }
        })
        .state("roleAuthor",{
            url:"/role/roleAuthor.html",
            templateUrl:"role/roleAuthor.html",
            resolve:{
                deps:function ($ocLazyLoad) {
                    return $ocLazyLoad.load(["toastr","jqGrid","res_roleAuth"])
                }
            }
        })

});