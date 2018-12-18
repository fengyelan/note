
/*
 *@desc 柯里化currying
 */
//currying的初步实现

//为什么使用[].push.apply(args,arguments);
// var a = [];
// var b = {
//     '0':1,
//     'length':1
// };
// //a.push(b); [{'0':1,'length':1}]
// [].push.apply(a,b);//[1]  a.push(1);
// console.log(a);


var cost = (function(){
    var args = [];
    return function(){
        if(arguments.length === 0){
            var res = 0;
            var len = args.length;
            for(var i=0;i<len;i++){
                res+=args[i];
            }
            return res; 
        }else{
            [].push.apply(args,arguments); 
        }
        console.log(args);
    }
})();

// console.log(cost(100));
// console.log(cost(200));
// console.log(cost(300));
// console.log(cost());


//currying的通用化的实现
console.log('=========currying=============')

var currying = function(fn){
    var args = [];
    var f = function(){
        if(arguments.length === 0){
            return fn.apply(this, args);
        }else{
            [].push.apply(args,arguments); 
            return f;
        }
    }
    return f;
}  

var costFn = function(){
    var res = 0; 
    for(var i=0,len = arguments.length;i<len;i++){
        res+=arguments[i];
    }
    return res;     
};

var costCur = currying(costFn);
// console.log(costCur(100));
// console.log(costCur(200));
// console.log(costCur(300));
// console.log(costCur());

console.log(costCur(100)(200)(300)());


