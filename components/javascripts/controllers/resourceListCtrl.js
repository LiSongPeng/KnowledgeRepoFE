/**
 * Created by Letg4 on 2017/9/6.
 */
var slistapp=angular.module('slistapp',['globalconfig','ui.router']);

slistapp.controller("sGridCtrl",sGridCtrl);
function sGridCtrl($scope,$state,$http) {
    jQuery(function ($) {
        var resource_query_url='resource/query.form';
        var grid_selector = "#grid-table";
        var pager_selector = "#grid-pager";
        var grid_searcher ="#grid-search";
        var colNames=['资源id','资源名称','资源类型','资源Url','资源图标','资源排序','创建人','创建时间'];
        var colModel=[
            {name:'id',index:'id',key:true,width:60,hidden:true,editable:false},
            {name:'sName',index:'sName',width:100,editable:false,editoptions:{size:"40",maxlength:"50"}},
            {name:'sType',index:'sType',width:45,editable:true,editoptions:{size:"40",maxlength:"50"},
                formatter:function (cellvalue,options,rowObject){
                    var stype=angular.fromJson(cellvalue);
                    if (stype===1){
                        return "功能项";
                    }else if(stype===0){
                        return '菜单项';
                    }
                }},
            {name:'sUrl',index:'treeData.sUrl',width:80,sortable:false,editable:false},
            {name:'sIcon',index:'treeData.sIcon',width:50,sortable:false,editable:false},
            {name:'sIndex',index:'treeData.sIndex',width:40,sortable:true,editable:false,
            sorttype:function (a,b) {
                return b.sIndex;
            }},
            // {name:'deleteStatus',index:'treeData.deleteStatus',width:40,edittype:"checkbox",
            //     formatter:function ( cellvalue, options, rowobject ) {
            //         var total="<label class='inline'>" +
            //             "<input type='checkbox' "+(cellvalue===0?"checked":"")+" value=0 offval=1 id='"+rowobject.id+"_delStatus' name='deleteStatus' " +
            //             "role='checkbox' class='ace ace-switch ace-switch-5'/>" +
            //             "<span class='lbl'></span>" +
            //             "</label>";
            //         return total;
            //     }},
            {name:'createUser',index:'treeData.createUser',width:60,sortable:true,editable:false,
                formatter:function (cellvalue,options,rowObject){
                    var crtuser=angular.fromJson(cellvalue);
                    if (crtuser===null){
                        return "无";
                    }
                    return cellvalue.uName;
                },
                sorttype:function (a,b) {
                    console.log(b.createUser.uName);
                    return b.createUser.uName;
                }
            },
            {name:'createTime',index:'treeData.createTime',width:80,sortable:true,editable:false,
                sorttype:function (a,b) {
                    return b.createTime;
                }
            }
        ];
        var prmNames={
            page:"currentPage",    // 表示请求页码的参数名称
            rows:"pageSize",    // 表示请求行数的参数名称
            sort: "sidx", // 表示用于排序的列名的参数名称
            order: "sord", // 表示采用的排序方式的参数名称
            search:"search", // 表示是否是搜索请求的参数名称
            nd:"nd", // 表示已经发送请求的次数的参数名称
            id:"id", // 表示当在编辑数据模块中发送数据时，使用的id的名称
            oper:"oper",    // operation参数名称（我暂时还没用到）
            editoper:"edit", // 当在edit模式中提交数据时，操作的名称
            addoper:"add", // 当在add模式中提交数据时，操作的名称
            deloper:"del", // 当在delete模式中提交数据时，操作的名称
            subgridid:"subid", // 当点击以载入数据到子表时，传递的数据名称
            npage: null,
            totalrows:"totalCounts" // 表示需从Server得到总共多少行数据的参数名称，参见jqGrid选项中的rowTotal
        };
        var jsonReaderConfig={
            root: "content",   // json中代表实际模型数据的入口
            page: "currentPage",   // json中代表当前页码的数据
            total: "totalPage", // json中代表页码总数的数据
            records: "totalCounts", // json中代表数据行总数的数据
            cell: "cell",
            id: "id",
            userdata: "userdata",
            repeatitems: false
        };


        jQuery(grid_selector).jqGrid({
            ajaxGridOptions:{
                beforeSend:function(jqXHR, settings) {
                    var wsCache=new WebStorageCache({
                        storage:'sessionStorage',
                        exp:900
                    });
                    if(window.sessionStorage.getItem("currUser")!=null){
                        var currUid=wsCache.get("currUser");
                        if(currUid===null){
                            alert("登录超时,请重新登录");
                            window.location.href="index.html";
                        }else {
                            var currUser=JSON.parse(currUid);
                            wsCache.touch("currUser",900);
                            jqXHR.setRequestHeader("Current-UserId",currUser.id);
                        }
                    }
                }
            },
            url: BASE_URL+resource_query_url,
            mtype:"POST",
            datatype: "json",
            height: 'auto',
            treeGrid:true,//w为ture则为树形表格
            treeGridModel:"adjacency",
            ExpandColumn:"sName",//展开的列
            ExpandColClick:true,//树形表格是否展开
            treeReader : {
                level_field: "level",
                parent_id_field: "sParentId",
                leaf_field: "leaf",
                expanded_field: "expanded"
            },
            treeIcons:{plus:'glyphicon glyphicon-chevron-right',minus:'glyphicon glyphicon-chevron-down',leaf:'glyphicon glyphicon-arrow-right'},
            colNames: colNames,
            colModel: colModel,
            sortname: 'sIndex',
            sortorder: 'asc',
            page:false,
            viewrecords: true,
            rowNum: -1,
            pager: pager_selector,
            multiselect: false,
            caption: "资源列表",
            autowidth: true,
            prmNames: prmNames,
            jsonReader: jsonReaderConfig,
            loadComplete : function() {
                // $("input[id$='_delStatus']").on('change',function () {
                //     var thisdom=this;
                //     $(thisdom).prop("disabled",true);
                //     var uid=$(thisdom).attr('id').slice(0,-10);
                //     var cbchecked=$(thisdom).is(":checked");
                //     $http({
                //         method: "POST",
                //         url: BASE_URL+"resource/updateDeleteStatus.form",
                //         headers : {
                //             'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
                //         },
                //         data:$.param({
                //             id:uid,
                //             deleteStatus: cbchecked?0:1
                //         })
                //     }).then(function (response) {
                //         $(thisdom).attr("disabled",false);
                //         toastr.success("修改逻辑删除状态成功！");
                //
                //     },function (response) {
                //         $(thisdom).prop("checked",response.data.deleteStatus===1);
                //         $(thisdom).prop("disabled",false);
                //         if (response.status===403){
                //             toastr.warning("操作失败！您所在的用户组没有此权限");
                //         }
                //         toastr.error("操作失败！错误代码及信息:"+response.status);
                //     })
                //
                // });
                var table = this;
                setTimeout(function(){
                    styleCheckbox(table);

                    updateActionIcons(table);
                    updatePagerIcons(table);
                    enableTooltips(table);
                }, 0);
            },
            editurl:BASE_URL+"resource/edit.form"
        });
        jQuery(grid_selector).jqGrid('navGrid',pager_selector,{
            edit: false,
            editicon : 'icon-pencil gray',
            add: false,
            addicon : 'icon-plus-sign purple',
            del: false,
            delicon : 'icon-trash red',
            search: false,
            searchicon : 'icon-search orange',
            refresh: true,
            refreshicon : 'icon-refresh green',
            view: false,
            viewicon : 'icon-zoom-in grey'
        },{},{},{})
            .navButtonAdd(pager_selector,{
                title:"新建资源",
                position:"last",
                caption:"",
                buttonicon:"icon-plus-sign purple",
                onClickButton:function () {
                    window.setTimeout(function () {
                        $("div.tooltip[role='tooltip']").remove();
                        window.location.href="#!/resource/resourceAdd.html";
                    }, 0);
                }
            })
            .navButtonAdd(pager_selector,{
                title:"编辑资源",
                position:"last",
                caption:"",
                buttonicon:"icon-pencil gray",
                onClickButton:function () {
                    var selid=jQuery('#grid-table').jqGrid('getGridParam','selrow');
                    if (selid==null||selid===""){
                        toastr.warning("未选取资源");
                        return;
                    }
                    window.setTimeout(function () {
                        $("div.tooltip[role='tooltip']").remove();
                        window.location.href="#!/resource/resourceAdd.html?edit=true&editId="+selid;
                    }, 0);
                }
            })
            .navButtonAdd(pager_selector,{
                title:"删除资源",
                position:"last",
                caption:"",
                buttonicon:"icon-trash red",
                onClickButton:function () {
                    var selid=jQuery('#grid-table').jqGrid('getGridParam','selrow');
                    if (selid==null||selid===""){
                        toastr.warning("未选取资源");
                        return;
                    }
                    confirm(function (selid) {
                        $http({
                            method: "POST",
                            url: BASE_URL+"resource/delete.form",
                            headers : {
                                'Content-Type' : "application/x-www-form-urlencoded"  //angularjs设置文件上传的content-type修改方式
                            },
                            data:$.param({
                                id:selid
                            })
                        }).then(function (response) {
                            jQuery('#grid-table').jqGrid('delRowData',selid);
                            toastr.success("删除成功！");
                        },function (response) {
                            if (response.status===403){
                                toastr.warning("删除失败！您所在的用户组没有此权限");
                            }
                            toastr.error("删除失败！错误代码及信息:"+response.status);
                        })
                    },selid)
                }
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

            $("#confirmOk").on("click", function() {
                $("#myConfirm").modal("hide");
                fun(params); // 执行函数
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
                    'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
                    'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
                    'ui-icon-seek-next' : 'icon-angle-right bigger-140',
                    'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
                };
            $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
                var icon = $(this);
                var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
            })
        }

        function enableTooltips(table) {
            $('.navtable .ui-pg-button').tooltip({container:'body'});
            $(table).find('.ui-pg-div').tooltip({container:'body'});
        }


    });

    $scope.toEdit = function (event) {
        var thistr = $(event.target).parents("tr.jqgrow").eq(0);
        var rowid = thistr.attr("id");
        $state.go('新建资源', {edit: true, editId: rowid});
    }
}