/**
 * Created by Letg4 on 2017/9/6.
 */
var ulistapp=angular.module('ulistapp',['ui.router']);

ulistapp.controller("uGridCtrl",uGridCtrl);
function uGridCtrl($scope,$state) {

    $scope.toEdit = function (event) {
        var thistr = $(event.target).parents("tr.jqgrow").eq(0);
        var rowid = thistr.attr("id");
        $state.go('userAdd', {edit: true, editId: rowid});
    }
}