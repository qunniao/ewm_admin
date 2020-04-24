
let ischeck=false
let usrl =  decodeURI(location.search); //获取url中"?"符后的字串
let adminid= usrl.split('&')[0].split('=')[1]
let adminshowid= usrl.split('&')[1].split('=')[1]
if(adminshowid==1){
    $('#savebtn').css('display','none')
}
if(adminid!=-1){
    ischeck=true
}
// 修改时获管理员例详情
function getcasedetail(){
    console.log(123)
    _ajax({
        url : "admin/info/"+adminid,  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data : {        //传入信息
        },
        success : function(data){   //返回接受信息
            let datas =JSON.parse(data);
            if(datas.code==200){
                $('#name').val(datas.data.username)
                // $('#email').val(datas.data.email)
                $('#phone').val(datas.data.phone)
                $('#nickname').val(datas.data.nickname)
                $('#email').val(datas.data.email)
                let div =' <div style="float:left;width: 100px;height:120px;"><img id="cover" name="shoppics" style="width: 100px;height:100px;" src="'+datas.data.cover+'"><title style="display: block;text-align: center" onclick="del(this)">删除</title></div>'
                $('#demo2').html(div)
                renderForm()
            }
        }
    })  
}
if(ischeck){
    ischeck=false;
    getcasedetail()
}



layui.use('upload', function(){
    var $ = layui.jquery
    ,upload = layui.upload;
    upload.render({
        elem: '#test2'
        ,url: Url+'/file/addFile'
        ,multiple: true
        ,field:'files'
        ,change: function(e, data) {//这个是选择文件的回调函数
            console.log(data)
            console.log(e)
            if(data.upload.length > 1){//这里是判断选择文件的个数,根据实际情况设置
                layer.alert('请选择单个文件!!!:', {//本人这里是用的layer插件提示用户
                    icon: 2,
                    skin: 'layer-ext-moon'
                });
                return false;
            }
        }
        ,before: function(e, data) {//这个是选择文件的回调函数
            console.log(e.upload)
            console.log(e.upload.length)
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

})

layui.use(['form', 'layer'],
function() {
    $ = layui.jquery;
    var form = layui.form,
    layer = layui.layer;

    form.on('select(changepro)', function(data){
        getprotwo(data.value)

    })
    //监听提交
    form.on('submit(add)',
    function(data) {
        if($('#cover')[0]==undefined){
            layer.msg('图片未上传', {icon: 5})
            return false
        }
        if(adminid!=-1){
            let pushdatas ={
                id :adminid,
                username:data.field.name,
                pwd:data.field.pwd,
                phone :data.field.phone ,
                nickname:data.field.nickname,
                email:data.field.email,
                cover:$('#cover')[0].src,
                jmsgName:'jgAdminTest4',
                jmsgPwd:'lisi'
            }
            _ajax({
                url : "/admin/update",  // url---->地址
                type : "PUT",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data :pushdatas,
                success : function(data){   //返回接受信息
                    let datas =JSON.parse(data);
                    if(datas.code==200){
                        layer.msg('修改成功', {icon: 1},function(){
                            xadmin.close()
                        }); 
                    }else{
                        layer.msg('修改失败', {icon: 5})
                    }
                }
            }) 
            // $.ajax({
            //     url:Url+"/admin/update",
            //     type:"PUT",
            //     data:pushdatas,
            //     dataType:"json",
            //     headers:{
            //         "token":localStorage.getItem('token')
            //     },
            //     contentType:"application/json",
            //     success:function(data){
            //             if(data.code==200){
            //                 layer.msg('修改成功', {icon: 1},function(){
            //                     closeiframe()
            //             });
            //         }
                    
            //     }
            // });             
        }else{
            let pushdatas ={
                username:data.field.name,
                pwd:data.field.pwd,
                phone :data.field.phone ,
                nickname:data.field.nickname,
                email:data.field.email,
                cover:$('#cover')[0].src,
                jmsgName:'jgAdminTest66',
                jmsgPwd:'lisi44'
            }
            _ajax({
                url : "/admin/save",  // url---->地址
                type : "POST",   // type ---> 请求方式
                async : true,   // async----> 同步：false，异步：true 
                data :pushdatas,
                success : function(data){   //返回接受信息
                    let datas =JSON.parse(data);
                    if(datas.code==200){
                        layer.msg('添加成功', {icon: 1},function(){
                            xadmin.close()
                        }); 
                    }else{
                        layer.msg('添加失败', {icon: 5})
                    }
                }
            })  
        }

        //发异步，把数据提交给php
        // layer.alert("增加成功", {
        //     icon: 6
        // },
        // function() {
        //     // 获得frame索引
        //     var index = parent.layer.getFrameIndex(window.name);
        //     //关闭当前frame
        //     parent.layer.close(index);
        // });
        return false;
    });

});
function del(thisdel){
    thisdel.parentNode.parentNode.removeChild(thisdel.parentNode);
}