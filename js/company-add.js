function del(e){
    e.parentNode.parentNode.removeChild(e.parentNode);
}
function dels(e){
    // console.log(e.parentNode.parentNode)
    e.parentNode.parentNode.remove();
}
let companydivnum=0
// 修改时获取案例详情
let pushid =''
function getcasedetail(){
    _ajax({
        url : "/companyInfos/info",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            if(datas.code==200){
                if(datas.data.length>=1){
                    let showdata =datas.data[0]
                    pushid=showdata.id
                    $('#name').val(showdata.name)
                    $('#address').val(showdata.address)
                    $('#phone').val(showdata.phone)
                    $('#wxNumber').val(showdata.wxNumber)
                    $('#qqNumber').val(showdata.qqNumber)
                    $('#email').val(showdata.email)
                    let environmentJsonlist = []
                    if(showdata.environmentJson!=null&&showdata.environmentJson!=''){
                        environmentJsonlist=showdata.environmentJson.split(',')
                    }
                    for(let i=0;i<environmentJsonlist.length;i++){
                        let div =' <div style="float:left;width: 100px;height:120px;"><img name="mobileshoppics" style="width: 100px;height:100px;" src="'+environmentJsonlist[i]+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                        $('#demo3').append(div)
                    }
                    $("#layeditDemo").val(showdata.intro);
                    layui.use('layedit', function () {
                        layedit = layui.layedit;
                        content = layedit.build('layeditDemo');
                    });
                    let companyparamlist = showdata.businessJson;
                    if(companyparamlist!=''){
                        let companyparamlistdata =JSON.parse(companyparamlist)
                        for(let i=0;i<companyparamlistdata.length;i++){
                            companydivnum =i+1;
                            let companydivid= 'companyiv'+companydivnum
                            let companyboxid = 'companyid'+companydivnum
                            let casediv=' <div name="casecsboxs" id="'+companyboxid+'" class="csbox" ><div class="csboxtwo"><input style="text-align:center" type="text" value="'+companyparamlistdata[i].name+'" placeholder="业务名称"  name="businessname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="业务介绍"  name="businessintroduce" value="'+companyparamlistdata[i].value+'" required="" lay-verify="required" autocomplete="off" class="layui-input maxinput"><label onclick="dels(this)"> 删除</label></div><img src="'+companyparamlistdata[i].img+'" name="businessimg" id="'+companydivid+'" ></div>'
                            $('#caseattrbox').append(casediv)
                            layui.use(['form', 'upload'], function () {
                                var $ = layui.jquery,
                                    form = layui.form,
                                    upload = layui.upload;
                                    upload.render({
                                        elem: '#'+companydivid
                                        ,url: Url+'/file/addFile'
                                        ,multiple: true
                                        ,field:'files'
                                        ,size:5120
                                        ,number:1
                                        ,change: function(e, data) {//这个是选择文件的回调函数
                                            if(data.upload.length > 1){//这里是判断选择文件的个数,根据实际情况设置
                                                layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                                    icon: 2,
                                                    skin: 'layer-ext-moon'
                                                });
                                                return false;
                                            }
                                        }
                                        ,before: function(e, data) {//这个是选择文件的回调函数
                                            if(e.upload.length > 2){//这里是判断选择文件的个数,根据实际情况设置
                                                layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                                    icon: 2,
                                                    skin: 'layer-ext-moon'
                                                });
                                                console.log('失败')
                                                return false;
                                            }
                                        }
                                        ,done: function(res){
                                            $('#'+companydivid).attr('src',res.data)
                                        //上传完毕
                                        }
                                    });
                            })
                            renderForm()
                        }
                        renderForm()
                    }
                }
                renderForm()
            }
        }
    })  
}
getcasedetail()
function addcompanyattr(){
    companydivnum +=1;
    let companydivid= 'companyiv'+companydivnum
    let companyboxid = 'companyid'+companydivnum
    let casediv=' <div name="casecsboxs" id="'+companyboxid+'" class="csbox" ><div class="csboxtwo"><input style="text-align:center" type="text" placeholder="业务名称"  name="businessname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="业务介绍"  name="businessintroduce" required="" lay-verify="required" autocomplete="off" class="layui-input maxinput""><label onclick="dels(this)"> 删除</label></div><img src="http://jinting-jiye.oss-cn-hangzhou.aliyuncs.com/84052c2c500642dab9225b5b777365c3.jpg" name="businessimg" id="'+companydivid+'" ></div>'
    $('#caseattrbox').append(casediv)
        layui.use(['form', 'upload'], function () {
            var $ = layui.jquery,
                form = layui.form,
                upload = layui.upload;
                upload.render({
                    elem: '#'+companydivid
                    ,url: Url+'/file/addFile'
                    ,multiple: true
                    ,field:'files'
                    ,size:5120
                    ,number:1
                    ,change: function(e, data) {//这个是选择文件的回调函数
                        if(data.upload.length > 1){//这里是判断选择文件的个数,根据实际情况设置
                            layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                icon: 2,
                                skin: 'layer-ext-moon'
                            });
                            return false;
                        }
                    }
                    ,before: function(e, data) {//这个是选择文件的回调函数
                        if(e.upload.length > 2){//这里是判断选择文件的个数,根据实际情况设置
                            layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                                icon: 2,
                                skin: 'layer-ext-moon'
                            });
                            return false;
                        }
                    }
                    ,done: function(res){
                        $('#'+companydivid).attr('src',res.data)
                    //上传完毕
                    }
                });
        })
    renderForm()
}
  
    function picuploads() {
    
    }
layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    upload.render({
        elem: '#test2'
        ,url: Url+'/file/addFile'
        ,multiple: true
        ,field:'files'
        ,size:5120
        ,number:1
        ,change: function(e, data) {//这个是选择文件的回调函数
            if(data.upload.length > 1){//这里是判断选择文件的个数,根据实际情况设置
                layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
        }
        ,before: function(e, data) {//这个是选择文件的回调函数
            if(e.upload.length > 2){//这里是判断选择文件的个数,根据实际情况设置
                layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                console.log('失败')
                return false;
            }
        }
        ,done: function(res){
            // for(let i=0;i<res.data.length;i++){
                let div =' <div style="float:left;width: 100px;height:120px;"><img id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').html(div)
            // }
        //上传完毕
        }
    });
    upload.render({
        elem: '#test3'
        ,url: Url+'/file/addFile'
        ,multiple: true
        ,field:'files'
        ,size:5120
        ,before: function(obj){
        }
        ,done: function(res){
            let div =' <div style="float:left;width: 100px;height:120px;"><img name="mobileshoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
            $('#demo3').append(div)
        //上传完毕
        }
    });
})
layui.use(['layedit', 'layer', 'jquery'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , layedit = layui.layedit;
    layedit.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: Url+'/file/addFile',
            accept: 'image',
            acceptMime: 'image/*',
            field:'files',
            exts: 'jpg|png|gif|bmp|jpeg',
            size: 1024 * 10,
            data: {
            }
            ,done: function (data) {
                console.log(data);
            }
        },
        uploadVideo: {
            url: 'your url',
            accept: 'video',
            acceptMime: 'video/*',
            exts: 'mp4|flv|avi|rm|rmvb',
            size: 1024 * 10 * 2,
            done: function (data) {
                console.log(data);
            }
        }
        , uploadFiles: {
            url:Url+'banner/addFile',
            accept: 'file',
            acceptMime: 'file/*',
            size: '20480',
            autoInsert: true , //自动插入编辑器设置
            done: function (data) {
                // console.log(data);
            }
        }
        //右键删除图片/视频时的回调参数，post到后台删除服务器文件等操作，
        //传递参数：
        //图片： imgpath --图片路径
        //视频： filepath --视频路径 imgpath --封面路径
        //附件： filepath --附件路径
        , calldel: {
        }
        , rightBtn: {
            type: "layBtn",//default|layBtn|custom  浏览器默认/layedit右键面板/自定义菜单 default和layBtn无需配置customEvent
            customEvent: function (targetName, event) {
                //根据tagName分类型设置
                switch (targetName) {
                    case "img":
                        alert("this is img");
                        break;
                    default:
                        alert("hello world");
                        break;
                };
                //或者直接统一设定
                //alert("all in one");
            }
        }
        //测试参数
        , backDelImg: true
        //开发者模式 --默认为false
        , devmode: true
        //是否自动同步到textarea
        , autoSync: true
        //内容改变监听事件
        , onchange: function (content) {
            // console.log(content);
        }
        //插入代码设置 --hide:false 等同于不配置codeConfig
        , codeConfig: {
            hide: true,  //是否隐藏编码语言选择框
            default: 'javascript', //hide为true时的默认语言格式
            encode: true //是否转义
            ,class:'layui-code' //默认样式
        }
        //新增iframe外置样式和js
        , quote:{
            // style: ['Content/css.css'],
            //js: ['/Content/Layui-KnifeZ/lay/modules/jquery.js']
        }
        , customlink:{
            title: '插入layui官网'
            , href: 'https://www.layui.com'
            ,onmouseup:''
        }
        , facePath: 'http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/'
        , devmode: true
        , videoAttr: ' preload="none" ' 
        , tool: [
            'undo', 'redo', 'code', 'strong', 'italic', 'underline', 'del', 'addhr', '|','removeformat', 'fontFomatt', 'fontfamily','fontSize', 'fontBackColor', 'colorpicker', 'face'
            , '|', 'left', 'center', 'right', '|', 'link', 'unlink', 'images', 'image_alt', 'attachment', 'anchors'
            , '|'
            , 'table','customlink'
            , 'fullScreen','preview'
        ]
        , height: '500px'
    });
var ieditor = layedit.build('layeditDemo');
})
layui.use(['form', 'layer'],
function() {
    $ = layui.jquery;
    var form = layui.form,
    layer = layui.layer;

    //监听提交
    form.on('submit(add)',
    function(data) {
        let casecslength=[]//获取所有案例的最外层id
        let caseparam =[]//案例属性
        let mobileurl='' //手机端详情图
        $("div[name='casecsboxs']").each(function(j,item){
            casecslength.push(item.id)
        });
        $("img[name='mobileshoppics']").each(function(j,item){
            if(j==0){
                mobileurl+=item.src
            }else{
                mobileurl+=","+item.src
            }
        });
        for(let i=0;i<casecslength.length;i++){
            $("#"+casecslength[i]).each(function(j,item){
                $("#"+casecslength[i]+" input[name='businessname']").each(function(j,item){
                    let paramkey ={
                        name:item.value,
                        value:'',
                        img:''
                    }
                    caseparam.push(paramkey)
                })
                $("#"+casecslength[i]+" input[name='businessintroduce']").each(function(j,item){
                    if(j==0){
                        caseparam[i].value=''+item.value
                    }else{
                        caseparam[i].value+=","+item.value
                    }
                })
                $("#"+casecslength[i]+" img[name='businessimg']").each(function(j,item){
                    caseparam[i].img=item.src
                })
            });
        }
        if(pushid!=''){
            let pushdatas ={
                id:pushid,
                name:data.field.name,
                email:data.field.email,
                address:data.field.address,
                phone:data.field.phone,
                wxNumber:data.field.wxNumber,
                qqNumber:data.field.qqNumber,
                environmentJson:mobileurl,
                businessJson:JSON.stringify(caseparam),
                intro:data.field.layeditDemo
            }
            postJSON('/companyInfos/saveOrUpdate', JSON.stringify(pushdatas),function(data){
                if(data.code==200&&data.data==true){
                    layer.msg('修改成功', {icon: 1});
                }else{
                    layer.msg('修改失败', {icon: 5})
                }
            } )                        
        }else{
            let pushdatas ={
                name:data.field.name,
                address:data.field.address,
                email:data.field.email,
                phone:data.field.phone,
                wxNumber:data.field.wxNumber,
                qqNumber:data.field.qqNumber,
                environmentJson:mobileurl,
                businessJson:JSON.stringify(caseparam),
                intro:data.field.layeditDemo
            }
            postJSON('/companyInfos/saveOrUpdate', JSON.stringify(pushdatas),function(data){
                if(data.code==200&&data.data==true){
                    layer.msg('添加成功', {icon: 1});
                }else{
                    layer.msg('添加失败', {icon: 5})
                }
            } )
        }
        return false;
    });

});