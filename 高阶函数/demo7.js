/*
 *@desc 惰性加载函数
 */

//返回顶部
//缺点是每次执行的时候都会执行一次if分支，造成了一些没有不必要的浪费。
var goTop = function(){
    if(/firefox/i.test(navigator.userAgent)){
        document.documentElement.scrollTop = 0;
    }else{
        document.body.scrollTop = 0;
    }
}


// 把嗅探工作提到代码加载的时候，在代码加载的时候就进行一次判断，这样使用多次也会只有一次判断了。
// 但是，这样导致一个缺点，如果函数整个页面没有使用到，这样就造成了浪费，提前嗅探浏览器的操作属于多余。
var goTop = (function(){
    var isFirefox = /firefox/i.test(navigator.userAgent);
    var ele = document[isFirefox ? 'documentElement' : 'body'];
    return function(){
        ele.scrollTop = 0;
    }
})();


//这就是惰性载入函数。goTop被声明为一个普通函数，在进入判断的时候，goTop被重写。
//在下一次进来的时候goTop函数就不会存在条件分支的语句了。
var goTop = function(){
    var isFirefox = /firefox/i.test(navigator.userAgent);
    if(isFirefox){
        goTop = function(){
            document.documentElement.scrollTop = 0;
        }
    }else{
        console.log('goTop no firefox');
        goTop = function(){
            document.body.scrollTop = 0;
        }
    }
    console.log(goTop);
    return goTop;
}

console.log(goTop());
console.log(goTop());


//事件绑定函数
//缺点是每次执行的时候都会执行一次if分支，造成了一些没有不必要的浪费。

// var addEvent = function(ele,type,handler){
//     console.log('addEvent enter')
//     if(window.addEventListener){
//         return ele.addEventListener(type,handler,false);
//     }else if(window.attachEvent){
//         return ele.attachEvent('on'+type,handler);
//     }
// }

//把嗅探工作提到代码加载的时候，在代码加载的时候就进行一次判断，这样使用多次也会只有一次判断了。
//但是，这样导致一个缺点，如果页面没有使用到addEvent函数，这样就造成了浪费，提前嗅探浏览器的操作属于多余。
// var addEvent = (function(){
//     console.log('addEvent enter')
//     if(window.addEventListener){
//         return function(ele,type,handler){
//             ele.addEventListener(type,handler,false);
//         }
//     }else if(window.attachEvent){
//         return function(ele,type,handler){
//             ele.attachEvent('on'+type,handler);
//         }
//     }
// })();

//
//这就是惰性载入函数。addEvent被声明为一个普通函数，在进入判断的时候，addEvent被重写。
//在下一次进来的时候addEvent函数就不会存在条件分支的语句了。
var addEvent = function(ele,type,handler){
    console.log('addEvent enter')
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

// var div1 = document.getElementById('div1');


// addEvent(div1,'click',function(){
//     console.log('I am div1');
// });

// addEvent(div1,'click',function(){
//     console.log('I am other div1');
// });




