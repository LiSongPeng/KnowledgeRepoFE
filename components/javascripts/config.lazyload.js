var app = angular.module('lazyloadConfig', ['oc.lazyLoad']);
app.constant('Modules_Config', [
    {
        name: 'jqGrid',
        serie: true,
        files: [
            "../components/stylesheets/jquery-ui-1.10.3.full.min.css",
            "../components/plugins/jqGrid/css/ui.jqgrid.css",
            "../components/stylesheets/ace/ace.min.css",
            "../components/stylesheets/ace/ace-rtl.min.css",
            "../components/stylesheets/ace/ace-my-skins.css",
            "../components/javascripts/jquery-ui-1.10.3.full.min.js",
            "../components/plugins/jqGrid/js/jquery.jqGrid.min.js",
            "../components/plugins/jqGrid/js/grid.locale-cn.js",
            "../components/plugins/jqGrid/js/grid.addons.js"
        ]
    }, {
        name: 'select2',
        serie: true,
        files: [
            "../components/plugins/select2/css/select2.css",
            "../components/plugins/select2/js/select2.js",
            "../components/plugins/select2/js/i18n/zh-CN.js"
        ]
    }, {
        name: 'toastr',
        serie: true,
        files: [
            "../components/plugins/toastr/toastr.css",
            "../components/plugins/toastr/toastr.min.js"
        ]
    }, {
        name: 'jBox',
        serie: true,
        files: [
            "../components/plugins/jBox/jBox.css",
            "../components/plugins/jBox/jBox.min.js"
        ]
    }, {
        name: 'treeview',
        serie: true,
        files: [
            "../components/plugins/treeview/TreeView.min.js"
        ]
    }, {
        name: 'bootstrap-treeview',
        serie: true,
        files: [
            "../components/plugins/bootstrap-treeview/bootstrap-treeview.min.css",
            "../components/plugins/bootstrap-treeview/bootstrap-treeview.min.js"
        ]
    }, {
        name: 'bootstrap-validator',
        serie: true,
        files: [
            "../components/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "../components/plugins/bootstrap-validator/js/bootstrapValidator.min.js"
        ]
    }, {
        name: 'res_search',
        serie: true,
        files: [
            "../components/javascripts/bootstrap/bootstrap-typeahead.js",
            "../components/javascripts/res_js/search.js"
        ]
    }, {
        name: 'res_knowledgeDetail',
        serie: true,
        files: [
            "../components/javascripts/res_js/detail.js"
        ]
    }, {
        name: 'res_knowledgeAdd',
        serie: true,
        files: [
            "../components/javascripts/wangEditor.min.js",
            "../components/javascripts/jquery-2.0.3.min.js"
        ]
    },{
        name:'res_userList',
        serie:true,
        files:[
            "../components/javascripts/controllers/userListCtrl.js"
        ]
    },{
        name:'res_resourceList',
        serie:true,
        files:[
            "../components/javascripts/controllers/resourceListCtrl.js"
        ]
    },{
        name:'res_roleList',
        serie:true,
        files:[
            "../components/javascripts/controllers/roleListCtrl.js"
        ]
    },{
        name:'res_userAdd',
        serie:true,
        files:[
            "../components/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "../components/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "../components/javascripts/controllers/userAddCtrl.js"
        ]
    },{
        name:'res_roleAdd',
        serie:true,
        files:[
            "../components/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "../components/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "../components/javascripts/controllers/roleAddCtrl.js"
        ]
    },{
        name:'res_resourceAdd',
        serie:true,
        files:[
            "../components/plugins/bootstrap-validator/css/bootstrapValidator.min.css",
            "../components/plugins/bootstrap-validator/js/bootstrapValidator.min.js",
            "../components/javascripts/controllers/resourceAddCtrl.js"
        ]
    },{
        name:'res_roleAuth',
        serie:true,
        files:[
            "../components/javascripts/controllers/roleAuthCtrl.js"
        ]
    },{
        name:'res_userRole',
        serie:true,
        files:[
            "../components/javascripts/controllers/userRoleCtrl.js"
        ]
    }
]);