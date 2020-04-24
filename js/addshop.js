// let shopotions =''
let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let prodectid= usrl.split('&')[0].split('=')[1]
let ischeck =false
if(prodectid!=''&&prodectid!=null&&prodectid!=undefined&&prodectid!=-1){
    ischeck=true
}
_ajax({
    url : "/ProductTypes/list",  // url---->地址
    type : "GET",   // type ---> 请求方式
    async : true,   // async----> 同步：false，异步：true 
    data : {        //传入信息
        current:1,
        size:10,
        pid :0
    },
    success : function(data){   //返回接受信息
        let datas =JSON.parse(data);
        if(datas.code==200){
            let shopprolist =''
            for(let i=0;i<datas.data.records.length;i++){
                let optiondiv = '<option value="'+datas.data.records[i].tid+'">'+datas.data.records[i].typeName+'</option>'
                shopprolist+=optiondiv
            }
            $('#protypeid').append(shopprolist)
            if(ischeck){
                ischeck=false
                getshopdetail(prodectid)
            }else{
                getprotwo(datas.data.records[0].tid)
            }
            renderForm()
        }
    }
})
function getprotwo(id){
    $('#ptid').empty()
    _ajax({
        url : "/ProductTypes/list",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
            current:1,
            size:10,
            pid :id
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            let shopprolisttwo =''
            if(datas.code==200){
                for(let i=0;i<datas.data.records.length;i++){
                    let shoptwodiv= '<option value="'+datas.data.records[i].tid+'">'+datas.data.records[i].typeName+'</option>'
                    shopprolisttwo+=shoptwodiv
                }
                $('#ptid').append(shopprolisttwo)
                renderForm()
            }
        }
    })
} 
function getshopdetail(){
    _ajax({
        url : "products/info/"+prodectid,  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            let shopdatas =datas.data
            if(datas.code==200){
                $('#product_name').val(shopdatas.productName)
                $('#product_intro').val(shopdatas.productIntro)
                $('#price').val(shopdatas.price)
                $('#store').val(shopdatas.store)
                $('#status').val(shopdatas.status)
                // $('#status').val(shopdatas.status)
                let shoppic =[]
                if(shopdatas.url!=undefined&&shopdatas.url!=null){
                    shoppic=shopdatas.url.split(',')
                }
                for(let i=0;i<shoppic.length;i++){
                    let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+shoppic[i]+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                    $('#demo2').append(div)
                }
                renderForm() 
                // 商品参数
                let shopcslist = [];
                if(shopdatas.productParams.length>0){
                    shopcslist = shopdatas.productParams;
                }
                $("#layeditDemo").val(datas.data.detailPc);
                layui.use('layedit', function () {
                    layedit = layui.layedit;
                    content = layedit.build('layeditDemo');
                });
                _ajax({
                    url : "/ProductTypes/info/"+datas.data.ptId,  // url---->地址
                    type : "GET",   // type ---> 请求方式
                    async : true,   // async----> 同步：false，异步：true 
                    data : {        //传入信息
                    },
                    success : function(data){   //返回接受信息
                        let datas =JSON.parse(data);
                        let checkdata =datas
                        if(datas.code==200){
                            if(datas.data.pid==0){
                                console.log(shopdatas)
                                $('#protypeid').val(shopdatas.ptId)
                                renderForm()
                            }else{
                                $('#ptid').empty()
                                _ajax({
                                    url : "/ProductTypes/list",  // url---->地址
                                    type : "GET",   // type ---> 请求方式
                                    async : true,   // async----> 同步：false，异步：true 
                                    data : {        //传入信息
                                        current:1,
                                        size:10,
                                        pid :datas.data.pid
                                    },
                                    success : function(data){   //返回接受信息
                                        let datas =JSON.parse(data);
                                        let shopprolisttwo =''
                                        if(datas.code==200){
                                            for(let i=0;i<datas.data.records.length;i++){
                                                let shoptwodiv= '<option value="'+datas.data.records[i].tid+'">'+datas.data.records[i].typeName+'</option>'
                                                shopprolisttwo+=shoptwodiv
                                            }
                                            $('#ptid').append(shopprolisttwo)
                                            renderForm()
                                            $('#ptid').val(checkdata.data.tid)
                                            $('#protypeid').val(checkdata.data.pid)
                                            renderForm()
                                        }
                                    }
                                })
                            }
                            renderForm()
                        }
                    }
                })
                for(let i=0;i<shopcslist.length;i++){
                    shopdivnum =1+i;
                    let shopdivid= 'shopdiv'+shopdivnum
                    let shoptwodiv =[]
                    if(shopcslist[i].value!=undefined&&shopcslist[i].value!=null){
                        shoptwodiv=shopcslist[i].value.split(',')
                    }
                    let shopdiv=' <div name="shopcsboxs" class="csbox" id="'+shopdivid+'"><input style="text-align:center" type="text" value="'+shopcslist[i].name+'" placeholder="参数名"  name="shopcsname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="参数值" value="'+shoptwodiv[0]+'"  name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label><label onclick="addshopctwo('+shopdivid+')"> 添加</label></div>'
                    $('#shopcs').append(shopdiv)
                    for(let j=1;j<shoptwodiv.length;j++){
                        let adddiv =' <div class="csboxtwo"><input type="text" value="'+shoptwodiv[j]+'" placeholder="参数值"  style="text-align:center" name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label></div>'
                        $('#'+shopdivid).append(adddiv)
                    }
                }
            }
        }
    })
}

layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    upload.render({
        elem: '#test2'
        ,url: Url+'/file/addFile'
        ,multiple: true
        ,field:'files'
        ,before: function(obj){
        //预读本地文件示例，不支持ie8
        // obj.preview(function(index, file, result){
        //     // $('#demo2').append('<img src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
        //     let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+result+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
        //     $('#demo2').append(div)
        // });
        }
        ,done: function(res){
                let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+res.data+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').append(div)
        //上传完毕
        }
    });
})
layui.use(['form', 'layer','layedit', 'jquery'],
function() {
    $ = layui.jquery;
    var form = layui.form,
    layer = layui.layer;

    //自定义验证规则
    form.verify({
        nikename: function(value) {
            if (value.length < 5) {
                return '昵称至少得5个字符啊';
            }
        },
        pass: [/(.+){6,12}$/, '密码必须6到12位'],
        repass: function(value) {
            if ($('#L_pass').val() != $('#L_repass').val()) {
                return '两次密码不一致';
            }
        }
    });

    form.on('select(changepro)', function(data){
        getprotwo(data.value)

    })
    //监听提交
    form.on('submit(add)',
    function(data) {
        let shoppic=[] //产品轮播图
        let shopcslength = [];
        let paramlist =[];//商品参数
        // let skulist =[];
        // 产品轮播图
        $("img[name='shoppics']").each(function(j,item){
            if(j==0){
                let imgdata={
                    isCover:1,
                    url:item.src,
                    flag:0
                }
                shoppic.push(imgdata)
            }else{
                let imgdata={
                    isCover:0,
                    url:item.src,
                    flag:0
                }
                shoppic.push(imgdata)
            }
        });
        // 获取全部商品参数个数
        $("div[name='shopcsboxs']").each(function(j,item){
            shopcslength.push(item.id)
        });
        // 产品参数获取
        for(let i=0;i<shopcslength.length;i++){
            console.log(shopcslength[i])
            $("#"+shopcslength[i]).each(function(j,item){
                $("#"+shopcslength[i]+" input[name='shopcsname']").each(function(j,item){
                    let paramkey ={
                        name:item.value,
                        value:''
                    }
                    paramlist.push(paramkey)
                })
                $("#"+shopcslength[i]+" input[name='shopcsnamestyle']").each(function(j,item){
                    if(j==0){
                        paramlist[i].value+=item.value
                    }else{
                        paramlist[i].value+=','+item.value
                    }
                })
            });
        }
        if(shoppic.length<1){
            layer.msg('产品轮播图未上传', {icon: 5})
                return false
        }
        let ptid =data.field.ptid
        if(data.field.ptid==''){
            ptid=data.field.protypeid
        }
        console.log(ptid)
        let jsondata={
            "isRecommend":Number(data.field.isRecommend),
            "productName": data.field.product_name,
            "productIntro": data.field.product_intro,
            "price": data.field.price,
            'priceUnit':'元',
            'ptId':ptid,
            'store':data.field.store,
            "status":Number(data.field.status),
            "productImage": shoppic,
            "productParams": paramlist,
            "detailPc":data.field.layeditDemo,
        }
        console.log(jsondata)
        if(prodectid!=''&&prodectid!=null&&prodectid!=undefined&&prodectid!=-1){
            jsondata.pid=prodectid
            putJSON("products/update",JSON.stringify(jsondata),function(data){
                if(data.code==200){
                    layer.msg('修改成功', {icon: 1},function(){
                            closeiframe()
                    });
                }else{
                    layer.msg('修改失败', {icon: 5})
                }
            })  
        }else{
            postJSON("/products/insert",JSON.stringify(jsondata),function(data){
                if(data.code==200){
                    layer.msg('添加成功', {icon: 1},function(){
                        closeiframe()
                    });
                }else{
                    layer.msg('添加失败', {icon: 5})
                }
            })
        }
        return false;
    });


});
let shopdivnum=0;
// 产品参数
function addshopctwo(e){
    console.log(e)
    let adddiv =' <div class="csboxtwo"><input type="text" placeholder="参数值"  style="text-align:center" name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label></div>'
    $('#'+e.id).append(adddiv)
}
function addshopcs(){
    shopdivnum +=1;
    let shopdivid= 'shopdiv'+shopdivnum
    console.log(shopdivid)
    let shopdiv=' <div name="shopcsboxs" class="csbox" id="'+shopdivid+'"><input style="text-align:center" type="text" placeholder="参数名"  name="shopcsname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="参数值"  name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label><label onclick="addshopctwo('+shopdivid+')"> 添加</label></div>'
    $('#shopcs').append(shopdiv)
}
function del(thisdel){
    thisdel.parentNode.parentNode.removeChild(thisdel.parentNode);
}
layui.use(['layedit', 'layer', 'jquery'], function () {
    var $ = layui.jquery
        , layer = layui.layer
        , layedit = layui.layedit;
    layedit.set({
        //暴露layupload参数设置接口 --详细查看layupload参数说明
        uploadImage: {
            url: Url+'banner/addFile',
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
            // url: 'your url',
            // done: function (data) {
            //     console.log(data);
            // }
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
        //自定义样式-暂只支持video添加
        //, customTheme: {
        //    video: {
        //        title: ['原版', 'custom_1', 'custom_2']
        //        , content: ['', 'theme1', 'theme2']
        //        , preview: ['', '/images/prive.jpg', '/images/prive2.jpg']
        //    }
        //}
        //插入自定义链接
        , customlink:{
            title: '插入layui官网'
            , href: 'https://www.layui.com'
            ,onmouseup:''
        }
        , facePath: 'http://knifez.gitee.io/kz.layedit/Content/Layui-KnifeZ/'
        , devmode: true
        , videoAttr: ' preload="none" ' 
        //预览样式设置，等同layer的offset和area规则，暂时只支持offset ,area两个参数
        //默认为 offset:['r'],area:['50%','100%']
        //, previewAttr: {
        //    offset: 'r'
        //    ,area:['50%','100%']
        //}
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