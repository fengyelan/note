/*
 *@desc 函数节流
 */
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
            clearTimeout(timer);//清空上次的定时器
            timer = null;
            self.apply(that, args);
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
        if(firstTime){ //如果第一次被调用，没有上次的执行时间
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


// window.onresize = throttle2(function(){
//     console.log(new Date());
// },1000);

// window.onresize = function(){
//     console.log(new Date());
// };