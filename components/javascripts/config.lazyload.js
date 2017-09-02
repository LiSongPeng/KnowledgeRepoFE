var app = angular.module('lazyloadConfig', ['oc.lazyLoad']);
app.constant('Modules_Config', [
    {
        name: 'jqGrid',
        serie: true,
        files: [
            // "../components/plugins/jqGrid/css/ui.jqgrid.css",
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
        name: 'bootstrap-validator',
        serie: true,
        files: [
            "../components/plugins/bootstrap-validator/validator.min.js"
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
    }
]);