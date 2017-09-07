/**
 * Created by Letg4 on 2017/9/6.
 */
var rlistapp=angular.module('rlistapp',['ui.router']);

rlistapp.controller("rGridCtrl",uGridCtrl);
function uGridCtrl($scope,$state) {

    $scope.toEdit = function (event) {
        var thistr = $(event.target).parents("tr.jqgrow").eq(0);
        var rowid = thistr.attr("id");
        $state.go('roleAdd', {edit: true, editId: rowid});
    }
}