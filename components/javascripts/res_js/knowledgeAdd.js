/**
 * Created by Letg4 on 2017/9/11.
 */

var knlgAdd=angular.module('knlgAdd',['globalconfig',['wangEditor']]);

knlgAdd.controller('knlgAddCtrl',knlgAddCtrl);

function knlgAddCtrl($scope) {
    var E = window.wangEditor;
    var editor1 = new E('#div1');  // 两个参数也可以传入 elem 对象，class 选择器
    var wsCache=new WebStorageCache({
        storage:'sessionStorage',
        exp:900
    });
editor1.customConfig.menus = [
    'head',  // 标题
    'bold',  // 粗体
    'italic',  // 斜体
    'underline',  // 下划线
    'strikeThrough',  // 删除线
    'foreColor',  // 文字颜色
    'backColor',  // 背景颜色

    'justify',  // 对齐方式
    'quote',  // 引用

    'undo',  // 撤销
    'redo'  // 重复
];
    editor1.customConfig.zIndex = 100;
    //editor1.customConfig.pasteFilterStyle = true;

    editor1.customConfig.onchange = function (html) {
        if(editor1.txt.text().length>100){

            toastr.warning("您输入的字符不应该大于100个！！");
           // toastr.warning("asfdsdrfsdfg");
            // alert(editor1.txt.html());
            // alert(editor1.txt.text());
            // alert(editor1.txt.text().length);
            //confirm3();

        }

    };
editor1.create();

document.getElementById('submit').addEventListener('click', function () {
    // document.getElementById("kAnswer").value=editor1.txt.text();  //获取纯文本
    document.getElementById("kAnswer").value=editor1.txt.html();       //获取带格式的文本
    //alert(editor1.txt.html());

}, false);



    $(function(){



    $("#knowledge").submit(function(){


        if(document.getElementById("kTitle").value.trim()=="") {
            //confirm();
            toastr.warning("知识标题是必填项！！");
            return false;
        }
        if(editor1.txt.text().length>100){
            toastr.warning("您输入的字符不应该大于100个！！");
            return false;
        }
        if(editor1.txt.text()==""){
            toastr.warning("知识解答是必填项！！");
            return false;
        }


        var data = $(this).serialize(); //序列化表单数据
        $.ajax({
            type: "post",
            url: BASE_URL+"kno/addKnowledge.form",
            data:data,
            headers: {"Current-UserId": JSON.parse(wsCache.get("currUser")).id},
            success: function (data) {
                wsCache.touch("currUser",900);
                //alert(data);
                if (data=="1"){
                    toastr.warning("知识标题已存在！！");
                };
                if(data=="0"){
                    toastr.success("添加成功！！");
                    location.href="#!/knowledgeRepo/knowledgeList.html";
                }

                //confirm2()

            },
            error:function () {

            }
        });


    });
});

$("#back").click(function () {
        location.href="#!/knowledgeRepo/knowledgeList.html";
    }
);

    function confirm() {
        if ($("#myConfirm").length > 0) {
            $("#myConfirm").remove();
        }


        var html = "<div class='modal fade' id='myConfirm' >"
            + "<div class='modal-dialog' style='z-index:2700; margin-top:10px; width:400px; '>"
            + "<div class='modal-content'>"
            + "<div class='modal-header'  style='font-size:16px; '>"
            + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
            + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
            + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
            + "知识标题是必填项！！"
            + "</div>"
            + "<div class='modal-footer ' style=''>"
            + "<button class='btn btn-danger' id='confirmOk'>确定</button>"

            + "</div>" + "</div></div></div>";
        $("body").append(html);
        editor1.$textElem.attr('contenteditable', false);
        $("#myConfirm").modal("show");

        $("#confirmOk").on("click", function () {
            $("#myConfirm").modal("hide");
            editor1.$textElem.attr('contenteditable', true);
            $("#kTitle").focus();

        });
    }

    function confirm2() {
        if ($("#myConfirm").length > 0) {
            $("#myConfirm").remove();
        }


        var html = "<div class='modal fade' id='myConfirm' >"
            + "<div class='modal-dialog' style='z-index:2700; margin-top:30px; width:400px; '>"
            + "<div class='modal-content'>"
            + "<div class='modal-header'  style='font-size:16px; '>"
            + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
            + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
            + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
            + "添加成功！！"
            + "</div>"
            + "<div class='modal-footer ' style=''>"
            + "<button class='btn btn-danger' id='confirmOk'>确定</button>"

            + "</div>" + "</div></div></div>";
        $("body").append(html);
        editor1.$textElem.attr('contenteditable', false);
        $("#myConfirm").modal("show");

        $("#confirmOk").on("click", function () {
            $("#myConfirm").modal("hide");
            editor1.$textElem.attr('contenteditable', true);
            location.href="#!/knowledgeRepo/knowledgeList.html";

        });
    }


    function confirm3() {
        if ($("#myConfirm").length > 0) {
            $("#myConfirm").remove();
        }


        var html = "<div class='modal fade' id='myConfirm' >"
            + "<div class='modal-dialog' style='z-index:2700; margin-top:30px; width:400px; '>"
            + "<div class='modal-content'>"
            + "<div class='modal-header'  style='font-size:16px; '>"
            + "<span class='glyphicon glyphicon-envelope'>&nbsp;</span>信息！<button type='button' class='close' data-dismiss='modal'>"
            + "<span style='font-size:20px;  ' class='glyphicon glyphicon-remove'></span></button></div>"
            + "<div class='modal-body text-center' id='myConfirmContent' style='font-size:18px; '>"
            + "您输入的字数超过限制！！(最多不超过100个字符)"
            + "</div>"
            + "<div class='modal-footer ' style=''>"
            + "<button class='btn btn-danger' id='confirmOk'>确定</button>"

            + "</div>" + "</div></div></div>";
        $("body").append(html);
        editor1.$textElem.attr('contenteditable', false);
        $("#myConfirm").modal("show");

        $("#confirmOk").on("click", function () {
            $("#myConfirm").modal("hide");
            editor1.$textElem.attr('contenteditable', true);
            location.href="#!/knowledgeRepo/knowledgeAdd.html";

        });
    }


};