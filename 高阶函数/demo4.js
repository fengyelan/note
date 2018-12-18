/*
 *@desc :uncurrying
 */
(function(){
    Array.prototype.push.call(arguments,5);
    console.log(arguments);
})(1,2,3,4);



//改变this指向的过程提取出来
Function.prototype.uncurrying = function(){
    var self = this; 
    return function(){
        var obj = Array.prototype.shift.call(arguments); 
        return self.apply(obj,arguments);
    }
}

//self : Array.prototype.push
//obj: {'length':0,'0':1}
//Array.prototype.push.apply({'length':0,'0':1},[1]);

Function.prototype.uncurrying = function(){
    var self = this;
    return function(){
        return Function.prototype.call.apply(self,arguments);
    }
}

//Function.prototype.call.apply(self,arguments);
//首先调用apply,再调用apply之前的函数
//Math.max.apply([],[1,2,3]):
//1.执行apply,将Math替换为[]  2.因为apply的作用，[1,2,3]已经扁平化为(1,2,3),接下来执行max,相当于[].max(1,2,3)

//参数是1 是一个类数组，简写为 {'0':1,'length':1}
 //Function.prototype.call.apply(Array.prototype.push,[{'0':1,'length':1},2]);
 Array.prototype.push.call({'0':1,'length':1},2) //参数的第一个对象作为函数的执行体
// call将{'0':1,'length':1}作为函数的执行对象，









var push = Array.prototype.push.uncurrying(); 
(function(){
    push(arguments,2);
    console.log(arguments);
})(1)





