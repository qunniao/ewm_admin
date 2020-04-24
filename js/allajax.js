
// let Url = 'http://10.7.17.154:8767/' 
// let Url = 'http://47.110.34.1:8763/v1/'
// let Url ='http://admin.zhanchengwlkj.com:8767/'
let Url ='http://admin.zhanchengwlkj.com:8080/product_code_backstage/'
let token = localStorage.getItem('token')
if(token==null){
    alert('登录已过期，请重新登录')
    top.location.href='login.html'
}
function closeiframe(){
    xadmin.close();
    parent.location.reload()
}
function renderForm(){
    layui.use('form', function(){
    var form = layui.form;//高版本建议把括号去掉，有的低版本，需要加()
    form.render();
    });
}

function _ajax(options){
    var xhr = null;
    var params = formsParams(options.data);
    //创建对象
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest()
    } else {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 连接
    if(options.type == "GET"||options.type == "PUT"){
        xhr.open(options.type,Url+options.url + "?"+ params,options.async);
        xhr.setRequestHeader("token",token);
        xhr.send(null)
    } else if(options.type == "POST"){
        xhr.open(options.type,Url+options.url,options.async);
        xhr.setRequestHeader("token",token);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    } else if(options.type == "DELETE"){
        xhr.open(options.type,Url+options.url + "?"+ params,options.async);
        xhr.setRequestHeader("token",token);
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(params);
    }
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.success(xhr.responseText);
            let returncode = JSON.parse(xhr.response).code
            if(returncode==41000||returncode==41001||returncode==41002){
                localStorage.removeItem('token')
                top.location.href='login.html'
            }
        }
    }
    function formsParams(data){
        var arr = [];
        for(var prop in data){
            arr.push(prop + "=" + data[prop]);
        }
        return arr.join("&");
    }
 
}
    /**
     * 修改数据的ajax-put请求
     * @author laixm
     */
    putJSON = function(url,data,callback){
        $.ajax({
            url:Url+url,
            type:"put",
            headers:{"Content-Type":"application/json",'token':localStorage.getItem('token')},
            dataType:"json",
            data:data,
            timeout:20000,
            success:function(msg){
                if(msg.code==41000||msg.code==41001||msg.code==41002){
                    alert('token失效')
                    localStorage.removeItem('token')
                    top.location.href='login.html'
                }else{
                    callback(msg);
                }
            },
            error:function(xhr,textstatus,thrown){
                console.log(xhr)
            }
        });
    };
    postJSON = function(url,data,callback){
        $.ajax({
            url:Url+url,
            type:"post",
            headers:{"Content-Type":"application/json",'token':localStorage.getItem('token')},
            dataType:"json",
            data:data,
            timeout:3000,
            success:function(msg){
                if(msg.code==41000||msg.code==41001||msg.code==41002){
                    alert('token失效')
                    localStorage.removeItem('token')
                    top.location.href='login.html'
                }else{
                    callback(msg);
                }
            },
            error:function(xhr,textstatus,thrown){
            }
        });
    };

    _ajax({
        url : "admin/list",  // url---->地址
        type : "GET",   // type ---> 请求方式
        async : true,   // async----> 同步：false，异步：true 
        data :{current:1,size:1},
        success : function(data){   //返回接受信息
           
        }
    })
function timeStamp2String(time, type) {
    var datetime = new Date();
    datetime.setTime(time);
    var year = datetime.getFullYear();
    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    if (type == '1') {
        return year + "年" + month + "月" + date + "日";
    }
    if (type == '2') {
        return year + "-" + month + "-" + date;
    }
    if (type == '3') {
        return month + "-" + date;
    }
    if(type == '4'){
        return month;
    }
    if(type == '5'){
        return date;
    }
    if(type == '6'){
        return year + "." + month + "." + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '7'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }
    if(type == '8'){
        return year + "-" + month + "-" + date + " " + hour + ":" + minute;
    }
    if(type == '9'){
        return month + "-" + date + " " + hour + ":" + minute;
    }
}
