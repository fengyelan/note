### 高阶函数
#### 定义
* 接收函数作为参数
* 返回值是函数

#####函数作为参数传递
* Array.prototype.map，
* Array.prototype.filter
* Array.prototype.reduce
* ajax回调
* ....

#####函数作为返回值
```
var isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object '+type+']';
    }
}
```

单例模式：

```
var getSingle = function(fn){
    var res;
    return function(){
        return res || (res = fn.apply(this,arguments));
    }
}

var getStr = getSingle(function(){
    return new String('123')
});

var str1 = getStr();
var str2 = getStr();

console.log(str1===str2); //true
```



####应用
##### 面向切面编程

* 让一个函数在另一个函数的之前或者之后执行
* 抽出来非业务的代码，保持业务代码的整洁
* 无侵入式编程，就是在不修改原有代码的基础上，对原始代码进行一些功能拓展。常可以应用于诸如统计、日志打印、原始函数功能补充等场景中。

```
Function.prototype.before = function(brforeFn){
    var self = this;
    return function(){
        brforeFn.apply(this, arguments);
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
```


主要应用：

1.防止window.onload被二次覆盖

```
window.onload = function(){
    console.log(1);
    console.log(2);
}
```
直接修改原始的代码，完全侵入式编程

改进：

```
var _onload = window.onload;
window.onload = function(){
    if(_onload){
        _onload();
    }
    console.log(2);
}
```
多出来一个变量，增加了额外的成本

再次改进：

```
window.onload = (window.onload || function(){}).after(function(){
    console.log(2);
})
```

2.统计日志上报

例如统计一下1000个dom插入body所花的时间

```
var createDom = function(){
    var start = new Date().getTime(); // 属于时间统计，与业务没有关系
    for(var i=0;i<1000;i++){
        var oDiv = document.createElement('div');
        oDiv.innerHTML = i;
        document.body.appendChild(oDiv);
    }
    var time = new Date().getTime() - start;// 属于时间统计，与业务没有关系
    console.log('createDom:' + time);// 属于时间统计，与业务没有关系
}
```
可以删除这些统计的代码，定义一个通用的包装器

```
var logTime = function(fn,fn_name){
    return fn = (function(){
        var start;
        return fn.before(function(){
            start = new Date().getTime();
        }).after(function(){
            var time = new Date().getTime() - start;
            console.log(fn_name+':'+time);
        })
    })();
}
createDom = logTime(createDom,'createDom');
createDom();

```


##### currying

又称部分求值
首先会接收一些参数。接收了参数之后并不会立即求值，而是继续返回另外一个函数，刚才传入的参数在函数形成的闭包中被保存起来。待到函数真正求值的时候，之前传入的参数都会被一次性用于求值。

```
var currying = function(fn){
    var args = [];
    var f = function(){
        if(arguments.length === 0){
            return fn.apply(this, args)
        }else{
            [].push.apply(args,arguments); 
            return f;
        }
    }
    return f;
}  

var costFn = (function(){
    var res = 0;
    return function(){
        for(var i=0,len = arguments.length;i<len;i++){
            res+=arguments[i];
        }
        return res;     
    }

})();

var costCur = currying(costFn);
console.log(costCur(100)); //[Function: f]
console.log(costCur(200)); //[Function: f]
console.log(costCur(300)); //[Function: f]
console.log(costCur()); //600

```

##### uncurrying

借用其他对象的方法

```
Function.prototype.uncurrying = function(){
    var self = this; //self : Array.prototype.push
    return function(){
        var obj = Array.prototype.shift.call(arguments); //obj: {'length':0,'0':1}
        return self.apply(obj,arguments);//Array.prototype.push.apply(obj,[2]);
    }
}

```

```

Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply(self,arguments);
    }
}
```

#####函数节流
* 原因：某些场景下函数被频繁调用，造成性能问题。例如resize，mousemove，scroll事件
* 原理：降低函数被调用的频率
* 实现：延时器或者时间戳 

```
var throttle = function(fn,interval){
    var self = fn,
        timer,
        firstTime = true;
    return function(){
        var  that = this,
            args = arguments;
        if(firstTime){ //如果第一次被调用，不需要延迟
            self.apply(that, args);
            firstTime = false;
            return;
        }
        if(timer){ //如果定时器还在，说明前一次的延迟执行还没有完成
            return;
        }
        timer = setTimeout(function(){
            clearTimeout(timer);
            timer = null;
            self.apply(that, args)
        },interval || 500);
    }
}

var throttle2 = function(fn,interval){
    var self = fn,
        firstTime = true,
        pre;
    return function(){
        var  that = this,
            args = arguments;
        if(firstTime){ //如果第一次被调用，不需要延迟
            self.apply(that, args);
            firstTime = false;
            pre = new Date().getTime();
            return;
        }
        var now = new Date().getTime();
        if(now - pre > interval){
            pre = now;
            self.apply(that, args);
        }

    }
}

window.onresize = throttle(function(){
    console.log(new Date());
},1000);

```

##### 分时函数

有些函数确实需要调用多次。例如手动创建一个用户数量很大的用户列表，这样造成短时间在页面添加大量的dom元素节点，这样对浏览器的性能造成很大影响，造成浏览器卡顿甚至卡死的现象。
解决方法：写一个函数创建节点的工作分批执行，例如200ms创建8个。

下面是一个通用的分时函数

```

var timeChunk = function(ary,fn,count){
    count = count || 1;
    var timer;
    var start = function(){
        for(var i=0,len=Math.min(count,ary.length);i<len;i++){
            var obj = ary.shift();
            fn(obj);
        }
    };
    return function(){
        timer = setInterval(function(){
            if(ary.length===0){
                clearInterval(timer);
                return;
            }
            start();
        },200);
    }
}

```

#####惰性加载函数
有些函数用到的时候只让它进行加载一次。
比如，浏览器的兼容性导致有些方法是不一致的，所以浏览器的嗅探工作是不可避免的。

例如常用的事件绑定函数。


```
var addEvent = function(ele,type,handler){
    if(window.addEventListener){
        return ele.addEventListener(type,handler,false);
    }else if(window.attachEvent){
        return ele.attachEvent('on'+type,handler);
    }
}
```

缺点是每次执行的时候都会执行一次if分支，造成了一些没有不必要的浪费。

改进：把嗅探工作提到代码加载的时候，在代码加载的时候就进行一次判断，这样使用多次也会只有一次判断了。

```

var addEvent = (function(){
    console.log('addEvent enter')
    if(window.addEventListener){
        return function(ele,type,handler){
            ele.addEventListener(type,handler,false);
        }
    }else if(window.attachEvent){
        return function(ele,type,handler){
            ele.attachEvent('on'+type,handler);
        }
    }
})();

```


缺点是如果页面没有使用到addEvent函数，这样就造成了浪费，提前嗅探浏览器的操作属于多余。

改进：使用惰性加载函数。

```
var addEvent = function(ele,type,handler){
    if(window.addEventListener){
        addEvent = function(ele,type,handler){
            ele.addEventListener(type,handler,false);
        }
    }else if(window.attachEvent){
        addEvent = function(ele,type,handler){
            ele.attachEvent('on'+type,handler);
        }
    }
    return addEvent;
}
```
这就是惰性载入函数。addEvent被声明为一个普通函数，在进入判断的时候，addEvent被重写。在下一次进来的时候addEvent函数就不会存在条件分支的语句了。
