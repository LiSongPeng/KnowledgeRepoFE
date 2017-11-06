
//当 datatype 为"local" 时需填写
toastr.options = {
    "positionClass": "toast-top-center",
};
var knlgList=angular.module('knlgList',['globalconfig',['jqGrid']]);

knlgList.controller('knlgListCtrl',knlgListCtrl);

function knlgListCtrl($scope ) {

    var grid_data = [{
        id: "00001",
        kTitle: "你好",
        kAnswer: "你也好",
        kUseCount: "2",
        kUseTimeLast: "2017-5-7",
        kApprStatus: "录入待审批",
        kApprUserId: "00002",
        kApprTime: "2017-4-9",
        kApprMemo: "常用",
        createUserId: "00003",
        createTime: "2015-6-8"
    }];
    var grid_selector = "#grid-table";
    var pager_selector = "#grid-pager";
    var grid_searcher ="#grid-search";
    $(document).ready(function () {
        jQuery("#grid-table").jqGrid({
            ajaxGridOptions: {
                beforeSend:function(jqXHR, settings) {
                    function getCookie(c_name){
                        if (document.cookie.length>0){　　//先查询cookie是否为空，为空就return ""
                            c_start=document.cookie.indexOf(c_name + "=")　;　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
                            if (c_start!=-1){
                                c_start=c_start + c_name.length+1;　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
                                c_end=document.cookie.indexOf(";",c_start);　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
                                if (c_end==-1) c_end=document.cookie.length;
                                return decodeURI(document.cookie.substring(c_start,c_end)).slice(1,-1)　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
                            }
                        }
                        return "";
                    }
                    var wsExp=getCookie("logOutTime");
                    var wsCache=new WebStorageCache({
                        storage:'sessionStorage',
                        exp:Number(wsExp)||900
                    });
                    if(window.sessionStorage.getItem("currUser")!=null){
                        var currUid=wsCache.get("currUser");
                        if(currUid===null){
                            alert("登录超时,请重新登录");
                            window.location.href="index.html";
                        }else {
                            var currUser=JSON.parse(currUid);
                            wsCache.touch("currUser",Number(getCookie("logOutTime"))||900);
                            jqXHR.setRequestHeader("Current-UserId",currUser.id);
                        }
                    }
                }

            },
            url: BASE_URL + "kno/selectPage.form",


            mtype: "GET",
            //data: grid_data, //当 datatype 为"local" 时需填写
            datatype: "json", //数据来源，本地数据（local，json,jsonp,xml等）
//            jsonp:"callback",
            height: "auto", //高度，表格高度。可为数值、百分比或'auto'

            colNames: ['知识id', '知识标题', '使用次数', '最后一次使用时间', '审批状态', '审批人', '审批时间', '审批意见', '创建人', '创建时间'],
            colModel: [

                {name: "id", index: "id", hidden: true, width: 100, editable: false,search:false},
                {name: "kTitle", index: "kTitle",width: 100, editable: true},
                //{name: "kAnswer", index: "kAnswer", width: 170, sorttype: "double", editable: true},
                {name: "kUseCount", index: "kUseCount",width: 100, editable: true,sortable:true,search:true},
                {
                    name: "kUserTimeLast",
                    index: "kUserTimeLast",
                    width: 220,
                    sortable: false,
                    editable: true,

                    search:false,
                    formatter: function (cellvalue, options, row) {

                        if(cellvalue==undefined){
                            return "";
                        }else{

                            return new Date(cellvalue).Format("yyyy-MM-dd hh:mm:ss");
                            //return new Date(cellvalue).toLocaleString()
                        }


                    }
                },
                {name: "kApprStatus", index: "kApprStatus", width: 150, sortable:false,editable: true},
                {name: "kApprUserId", index: "kApprUserId", width: 150,sortable:false, editable: true,search:false},
                {
                    name: "kApprTime",
                    index: "kApprTime",
                    width: 220,
                    editable: true,
                    search:false,
                    sortable:false,
                    formatter: function (cellvalue, options, row) {
                        if(cellvalue==undefined){
                            return "";
                        }else{
                            return new Date(cellvalue).Format("yyyy-MM-dd hh:mm:ss");
                        }
                    }
                },
                {name: "kApprMemo", index: "kApprMemo", width: 150, sortable:false,editable: true,search:false},
                {name: "createUserId", index: "createUserId", width: 150, sortable:false,editable: true,search:false},
                {
                    name: "createTime",
                    index: "createTime",
                    width: 220,
                    editable: true,
                    sortable:true,
                    search:false,
                    formatter: function (cellvalue, options, row) {
                        return new Date(cellvalue).Format("yyyy-MM-dd hh:mm:ss");
                    }
                }],
            viewrecords: true, //是否在浏览导航栏显示记录总数
            //scroll: 1,
            rowNum: 10, //每页显示记录数
            rownumbers:true,
            rowList: [10, 20, 30], //用于改变显示行数的下拉列表框的元素数组。
            pager: pager_selector, //分页、按钮所在的浏览导航栏
            altRows: true, //设置为交替行表格,默认为false
            multiselect: false, //是否多选
            multiboxonly: true, //是否只能点击复选框多选
           // multiSort: true,


             sortname:'createTime',//默认的排序列名
            sortorder:'desc',//默认的排序方式（asc升序，desc降序）
            caption: "知识管理", //表名
            autowidth: true, //自动宽
//
            repeatitems: false,
            search:"search", // 表示是否是搜索请求的参数名称





            jsonReader: {

                root: "content",
                page: "currentPage",
                total: "totalPages",
                records: "totalCounts"
                // sord:"sord",
                // sidx:"sidx"
            },
            loadComplete: function () {
                var table = this;
                setTimeout(function () {
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                    $("#sg_kTitle").attr("placeholder","知识标题");
                    $("#sg_status").attr("placeholder","审批状态");
                }, 0);
            },


            // gridComplete: function () {
            //     //单选处理
            //     if (true) {
            //         var gridId = grid_selector.substring(1);
            //         $("#cb_" + gridId).hide();//隐藏全选按钮
            //         $(grid_selector).find("td[aria-describedby='" + gridId + "_cb']").find("input[type='checkbox']").prop("type", "radio");//将checkbox替换为radio
            //         $(grid_selector).find("td[aria-describedby='" + gridId + "_cb']").find("input[type='radio']").prop("name", gridId);//radio设为同一名字
            //     }
            //
            // },
            //
            // beforeSelectRow: function () {
            //     //单选处理
            //     if (true) {
            //         // $(grid_selector).jqGrid('clearSelect'); //执行自定义的函数（下面会讲）
            //         $(grid_selector).find(".ui-state-highlight").removeClass("ui-state-highlight").removeAttr("aria-selected"); //样式控制
            //         return true;
            //     }
            // }


        });
//浏览导航栏添加功能部分代码

        jQuery(grid_selector).jqGrid('navGrid', pager_selector, {
                edit: false,
                editicon: 'icon-pencil gray',
                add: false,
                addicon: 'icon-plus-sign purple',
                del: false,
                delicon: 'icon-trash red',
                search: false,
                searchicon: 'icon-search orange',
                refresh: true,
                refreshicon: 'icon-refresh green',
                view: false,
                viewicon: 'icon-zoom-in grey'
            },

            {}, // edit options
            {}, // add options
            {


//                        url: BASE_URL+"knowledgeDelete.form"


            }, // delete options
            {

     //            caption: "搜索...",
     //
     // Find: "查找",
     //
     //  Reset: "重置",
     //   odata : ['have','null','equal', 'not equal', 'less', 'less or equal','greater','greater or equal', 'begins with','does not begin with','is in','is not in','ends with','does not end with','contains','does not contain'],
     //
     //  groupOps: [ { op: "AND", text: "all" }, { op: "OR", text: "any" } ],
     //
     //  matchText: " match",
     //
     //  rulesText: " rules"

    })
            .navButtonAdd(pager_selector, {
                caption: "",
                buttonicon: "icon-list blue",
                onClickButton: function () {

                    var selid = jQuery('#grid-table').jqGrid('getGridParam', 'selrow');
                    if (selid == null || selid === "") {
                       toastr.warning("请选择要查看的知识！！");
                    }else {
                        $("div.tooltip[role='tooltip']").remove();
                        location.href = "home.html#!/knowledgeRepo/knowledge.html?id=" + selid
                    }

                },
                title: "知识详情"

            }, {})
            .navButtonAdd(pager_selector, {
                caption: "",
                buttonicon: "icon-plus-sign purple",
                onClickButton: function () {
                    $("div.tooltip[role='tooltip']").remove();
                    location.href = "home.html#!/knowledgeRepo/knowledgeAdd.html"
                },
                title:"知识添加",

            }, {})

            .navButtonAdd(pager_selector, {
                caption: "",
                buttonicon: "icon-pencil gray",
                onClickButton: function () {

                    var selid = jQuery('#grid-table').jqGrid('getGridParam', 'selrow');
                    if (selid == null || selid === "") {
                        // confirm2(function (selid) {
                        // }, selid)
                        toastr.warning("请选择要编辑的知识！！");
                    }else {
                        $("div.tooltip[role='tooltip']").remove();
                        location.href = "home.html#!/knowledgeRepo/knowledgeEdit.html?id=" + selid
                    }

                },
                title: "知识修改"

            }, {})

            .navButtonAdd(pager_selector, {
            caption: "",
            buttonicon: "icon-trash red",
            onClickButton: function () {
                var selid = jQuery('#grid-table').jqGrid('getGridParam', 'selrow');
                if (selid == null || selid == "") {
                    // confirm3()
                    toastr.warning("请选择要删除的知识！！");
                    return;
                }
                confirm(function (selid) {

                    $.ajax({
                        type: "GET",
                        url: BASE_URL + "kno/knowledgeDelete.form",
                        data: {"id": selid},
                        async: true,
                        headers: {"Current-UserId": JSON.parse(window.sessionStorage.getItem("currUser")).id},
                        success: function (response) {
                            console.log("ahaha ");
                            $('#grid-table').trigger('reloadGrid');
                            toastr.success("删除成功！");
                        },
                        error: function (response) {

                        }

                    });


                }, selid)
            },
            title: "删除资源",
            position: "last"
        });


        // $("#searchButton").click(function(){
        //
        //
        //
        //
        //
        //
        // });

        jQuery(grid_searcher).filterGrid(grid_selector,{
//                gridModel: true,
            filterModel:[{
                label:'',
                name:'kTitle',
                stype:'text'
            },{
                label:'',
                name
                    :
                    'status',
                stype
                    :
                    'text'
            }],
            searchButton:"查询",
            clearButton:"清空",
            formtype: 'horizontal',
            url: BASE_URL + "kno/search.form",
            autosearch: false,
            buttonclass: 'fm-button btn-purple',
            enableSearch: true,
            enableClear: true,
            // Find: "查找",
            // //
            // Clear: "重置"
        });


        function confirm(fun, params) {
            if ($("#myConfirm").length > 0) {
                $("#myConfirm").remove();
            }
            var html = "<div class='modal fade' id='myConfirm' >"
                + "<div class='modal-dialog' style='z-index:2901; margin-top:60px; width:400px; '>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'  style='font-size:16px; '>"
                + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
                + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
                + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
                + "是否确定要删除？"
                + "</div>"
                + "<div class='modal-footer ' style=''>"
                + "<button class='btn btn-danger' id='confirmOk'>确定</button>"
                + "<button class='btn btn-info' data-dismiss='modal'>取消</button>"
                + "</div>" + "</div></div></div>";
            $("body").append(html);

            $("#myConfirm").modal("show");

            $("#confirmOk").on("click", function () {
                $("#myConfirm").modal("hide");
                fun(params); // 执行函数
            });
        }

        function confirm2(fun, params) {
            if ($("#myConfirm").length > 0) {
                $("#myConfirm").remove();
            }
            var html = "<div class='modal fade' id='myConfirm' >"
                + "<div class='modal-dialog' style='z-index:2901; margin-top:60px; width:400px; '>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'  style='font-size:16px; '>"
                + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
                + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
                + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
                + "请选择要编辑的内容？"
                + "</div>"
                + "<div class='modal-footer ' style=''>"
                + "<button class='btn btn-danger' id='confirmOk'>确定</button>"

                + "</div>" + "</div></div></div>";
            $("body").append(html);

            $("#myConfirm").modal("show");

            $("#confirmOk").on("click", function () {
                $("#myConfirm").modal("hide");
                fun(params); // 执行函数
            });
        }

        function confirm3() {
            if ($("#myConfirm").length > 0) {
                $("#myConfirm").remove();
            }
            var html = "<div class='modal fade' id='myConfirm' >"
                + "<div class='modal-dialog' style='z-index:2901; margin-top:60px; width:400px; '>"
                + "<div class='modal-content'>"
                + "<div class='modal-header'  style='font-size:16px; '>"
                + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
                + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
                + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
                + "请选择要删除的信息？"
                + "</div>"
                + "<div class='modal-footer ' style=''>"
                + "<button class='btn btn-danger' id='confirmOk'>确定</button>"

                + "</div>" + "</div></div></div>";
            $("body").append(html);

            $("#myConfirm").modal("show");

            $("#confirmOk").on("click", function () {
                $("#myConfirm").modal("hide");

            });
        }








        function style_edit_form(form) {
            //enable datepicker on "sdate" field and switches for "stock" field
//                form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
//                    .end().find('input[name=stock]')
//                    .addClass('ace ace-switch ace-switch-5').wrap('<label class="inline" />').after('<span class="lbl"></span>');

            //update buttons classes
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-primary').prepend('<i class="icon-ok"></i>');
            buttons.eq(1).prepend('<i class="icon-remove"></i>')

            buttons = form.next().find('.navButton a');
            buttons.find('.ui-icon').remove();
            buttons.eq(0).append('<i class="icon-chevron-left"></i>');
            buttons.eq(1).append('<i class="icon-chevron-right"></i>');
        }

        function style_delete_form(form) {
            var buttons = form.next().find('.EditButton .fm-button');
            buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
            buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
            buttons.eq(1).prepend('<i class="icon-remove"></i>')
        }

        function style_search_filters(form) {
            form.find('.delete-rule').val('X');
            form.find('.add-rule').addClass('btn btn-xs btn-primary');
            form.find('.add-group').addClass('btn btn-xs btn-success');
            form.find('.delete-group').addClass('btn btn-xs btn-danger');
        }

        function style_search_form(form) {
            var dialog = form.closest('.ui-jqdialog');
            var buttons = dialog.find('.EditTable')
            buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'icon-retweet');
            buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'icon-comment-alt');
            buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'icon-search');
        }


        function styleCheckbox(table) {
            /**
             $(table).find('input:checkbox').addClass('ace')
             .wrap('<label />')
             .after('<span class="lbl align-top" />')


             $('.ui-jqgrid-labels th[id*="_cb"]:first-child')
             .find('input.cbox[type=checkbox]').addClass('ace')
             .wrap('<label />').after('<span class="lbl align-top" />');
             */
        }

        function updateActionIcons(table) {
            /**
             var replacement =
             {
                 'ui-icon-pencil' : 'icon-pencil blue',
                 'ui-icon-trash' : 'icon-trash red',
                 'ui-icon-disk' : 'icon-ok green',
                 'ui-icon-cancel' : 'icon-remove red'
             };
             $(table).find('.ui-pg-div span.ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					})
             */
        }

        function updatePagerIcons(table) {
            var replacement =
                {
                    'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
                    'ui-icon-seek-prev': 'icon-angle-left bigger-140',
                    'ui-icon-seek-next': 'icon-angle-right bigger-140',
                    'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
                };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({container: 'body'});
            $(table).find('.ui-pg-div').tooltip({container: 'body'});
        }


    });
    Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
            "M+": this.getMonth() + 1,//月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

}