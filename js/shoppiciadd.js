// let shopotions =''
let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let piciid= usrl.split('&')[0].split('=')[1]
let picishow= usrl.split('&')[1].split('=')[1]
let ischeck =false
if(prodectshowid==1){
    $('#savebtn').css('display','none')
}
if(prodectid!=''&&prodectid!=null&&prodectid!=undefined&&prodectid!=-1){
    _ajax({
        url : "products/info/"+prodectid,  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            let shopdatas =datas.data
            console.log(shopdatas)
            $('#product_name').val(shopdatas.productName)
            $('#product_intro').val(shopdatas.productIntro)
            $('#price').val(shopdatas.price)
            $('#store').val(shopdatas.store)
            $('#status').val(shopdatas.status)
            $('#status').val(shopdatas.status)
            let shoppic =shopdatas.url.split(',')
            for(let i=0;i<shoppic.length;i++){
                let div =' <div style="float:left;width: 100px;height:120px;"><img name="shoppics" style="width: 100px;height:100px;" src="'+shoppic[i]+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').append(div)
            }
            renderForm() 
            // 商品参数
            let shopcslist = shopdatas.productParam;
            for(let i=0;i<shopcslist.length;i++){
                shopdivnum =1+i;
                let shopdivid= 'shopdiv'+shopdivnum
                let shoptwodiv =[]
                if(shopcslist[i].values!=undefined){
                    shoptwodiv=shopcslist[i].values.split(',')
                }
                let shopdiv=' <div name="shopcsboxs" class="csbox" id="'+shopdivid+'"><input style="text-align:center" type="text" value="'+shopcslist[i].name+'" placeholder="参数名"  name="shopcsname" required="" lay-verify="required" autocomplete="off" class="layui-input"><input type="text" style="text-align:center" placeholder="参数值" value="'+shoptwodiv[0]+'"  name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label><label onclick="addshopctwo('+shopdivid+')"> 添加</label></div>'
                $('#shopcs').append(shopdiv)
                for(let j=1;j<shoptwodiv.length;j++){
                    let adddiv =' <div class="csboxtwo"><input type="text" value="'+shoptwodiv[j]+'" placeholder="参数值"  style="text-align:center" name="shopcsnamestyle" required="" lay-verify="required" autocomplete="off" class="layui-input"><label onclick="del(this)"> 删除</label></div>'
                    $('#'+shopdivid).append(adddiv)
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
                        values:''
                    }
                    paramlist.push(paramkey)
                })
                $("#"+shopcslength[i]+" input[name='shopcsnamestyle']").each(function(j,item){
                    if(j==0){
                        paramlist[i].values+=item.value
                    }else{
                        paramlist[i].values+=','+item.value
                    }
                })
            });
        }
        if(shoppic.length<1){
            layer.msg('产品轮播图未上传', {icon: 5})
                return false
        }
        let jsondata={
            "isRecommend":Number(data.field.isRecommend),
            "productName": data.field.product_name,
            "productIntro": data.field.product_intro,
            "price": data.field.price,
            'priceUnit':'元',
            "status":Number(data.field.status),
            "productImage": shoppic,
            "productParams": paramlist,
        }
        console.log(jsondata)
        if(prodectid!=''&&prodectid!=null&&prodectid!=undefined&&prodectid!=-1){
            jsondata.pid=prodectid
            putJSON("/products/update",JSON.stringify(jsondata),function(data){
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