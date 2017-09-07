/**
 * Created by Letg4 on 2017/9/6.
 */
var slistapp=angular.module('slistapp',['ui.router']);

slistapp.controller("sGridCtrl",sGridCtrl);
function sGridCtrl($scope,$state) {

    $scope.toEdit = function (event) {
        var thistr = $(event.target).parents("tr.jqgrow").eq(0);
        var rowid = thistr.attr("id");
        $state.go('resourceAdd', {edit: true, editId: rowid});
    }
}