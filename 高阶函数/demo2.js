/*
 *@desc 面向切面编程
 */
//首先保留一个原函数的引用self
//返回一个新函数：包含beforeFn函数和原函数
//在这个新函数里面，按照顺序，把两个函数执行一遍，并返回原函数的执行结果

//一定使用apply绑定函数的执行体是this，
//否则beforeFn(arguments);return self(arguments);的话，
//这样返回的函数的执行体就是window，有些函数不是window对象上定义的，而是在一个特定对象上面
Function.prototype.before = function(beforeFn){
    var self = this;
    return function(){
        beforeFn.apply(this, arguments); 
        return self.apply(this,arguments);
    }
}


Function.prototype.after = function(afterFn){
    var self = this;
    return function(){
        var ret = self.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

function before(fn,beforeFn){
    return function(){
        beforeFn.apply(this,arguments);
        fn.apply(this,arguments);
    }
}

var fn = function(){
    console.log('fn');
}

fn = fn.before(function(){
    console.log('before');
}).after(function(){
    console.log('after');
});

fn();
//before
//fn
//after


//为什么要修正this 使用beforeFn.apply(this, arguments); self.apply(this,arguments);
//例子，如果不使用apply的话，直接beforeFn(arguments);self(arguments);this会指向window，会在window上面找不到getA的方法，
//使用apply，this指向 fnObj
var fnObj = {
    a:1,
    getA:function(){
        console.log(this.a);
    }
}

fnObj.getA = fnObj.getA.before(function(){
    console.log('before fnn');
})

//修正之后this指向
// fnObj.getA = function(){
//    beforeFn.apply(this, arguments);
//    return self.apply(this,arguments);
// }


//如果不apply,改变this的指向，this就会指向window

// fnObj.getA = function(){
//    beforeFn(arguments);
//    self(arguments); 
// }

// self = function(){
//     console.log(this.a);
// }

//this.a  undefined;  this指向了window

console.log('======fnnnn:=======')
fnObj.getA();







// 防止window.onload被二次覆盖
window.onload = function(){
    console.log(1);
    //.....
}

var _onload = window.onload;
window.onload = function(){
    if(_onload){
        _onload();
    }
    console.log(2);
}

window.onload = (window.onload || function(){}).after(function(){
    console.log(2);
});

//统计日志上报，
//例如统计函数的执行时间

var createDom = function(){
    //var start = new Date().getTime();
    for(var i=0;i<1000;i++){
        var oDiv = document.createElement('div');
        oDiv.innerHTML = i;
        document.body.appendChild(oDiv);
    }
    //var time = new Date().getTime() - start;
    //console.log('createDom:' + time);
}

//可以删除这些统计的代码，定义一个通用的包装器
var logTime = function(fn,fn_name){
    var start;
    return fn.before(function(){
        start = new Date().getTime();
    }).after(function(){
        var time = new Date().getTime() - start;
        console.log(fn_name+':'+time);
    })
}

createDom = logTime(createDom,'createDom');
createDom();

//例如统计点击
var clickFn = function(){
    console.log('clicked');
}
//上报点击的函数
var log = function(pos){
    console.log('上报的点击是：'+pos)
}
clickFn = clickFn.after(function(){
    log('clickDiv1');
});

// clickFn();

document.querySelector('#div1').onclick = clickFn;



//例如 动态传递参数
var ajax = function (method,url,param){
    // param = param || {};
    // param.token = getToken();
    console.log(param);
}

ajax = ajax.before(function(method,url,param){
    param.token = getToken();
});

var getToken = function(){
    return 'token';
}



ajax('get','//jd.com',{uuid:123});


//例如表单验证
var userInfo = {
    username:'',
    password:''
}

var formSubmit = function(){
    if(!userInfo.username){
        console.log('用户名为空');
        return false;
    }
    if(!userInfo.password){
        console.log('密码为空');
        return false;
    }
    submitFn();
}

var submitFn = function(){
    console.log('调用提交的接口了');
}

Function.prototype.before = function(beforeFn){
    var self = this;
    return function(){
        if(beforeFn.apply(this, arguments) === false){
            return;
        }
        return self.apply(this,arguments);
    }
}

var checkoutForm = function(){
    if(!userInfo.username){
        console.log('用户名为空');
        return false;
    }
    if(!userInfo.password){
        console.log('密码为空');
        return false;
    }
};

var formSubmit = submitFn.before(checkoutForm);

formSubmit();




