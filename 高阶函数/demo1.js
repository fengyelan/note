
var generateNewArr = function(arr){
    var res = [];
    for(var i=0,len=arr.length;i<len;i++){
        res.push(arr[i]*2);
    }
    return res;
}

console.log(generateNewArr([1,2,3,4]));

console.log([1,2,34].map(function(i){return i*2;}));


//函数作为参数
//实现的map,filter,reduce
function mapFn(arr,fn){
    var res = [];
    for(var i=0,len=arr.length;i<len;i++){
        res.push(fn(arr[i]));
    }
    return res;
}

function filterFn(arr,fn){
    var res = [];
    for(var i=0,len=arr.length;i<len;i++){
        res.push(fn(arr[i]));
    }
    return res;
}

function reduceFn(arr,fn,initVal){
    var res=0,
        count = 0;
        len = arr.length,
        i = initVal ? 0 : 1;
    
    while(i<len){
        if(count===0){
            res = fn(initVal ? initVal : arr[0],arr[i]);
        }else{
            res = fn(res,arr[i]);
        }
        i++;
        count++;
    }
   
    return res;
}


//test
var arr = [1,2,3,4,5,6];
console.log('map:'+mapFn(arr,function(i){return 2*i;}));
console.log('filter:'+filterFn(arr,function(i){return i>3;}));
console.log('reduce:'+reduceFn(arr,function(add,i){return add+i;}));
console.log('reduce:'+reduceFn(arr,function(add,i){return add+i;},9));

//函数作为返回值
var isString = function(obj){
    return Object.prototype.toString.call(obj) === '[object String]';
}

var isDate = function(obj){
    return Object.prototype.toString.call(obj) === '[object Date]';
}

var isArray = function(obj){
    return Object.prototype.toString.call(obj) === '[object Array]';
}

var isNull = function(obj){
    return Object.prototype.toString.call(obj) === '[object Null]';
}

//...

var isType = function(type){
    return function(obj){
        return Object.prototype.toString.call(obj) === '[object '+type+']';
    }
}

var isString = isType('String');
var isArray = isType('Array');
var isDate = isType('Date');
var isNull = isType('Null');



var str = '123';
var date = new Date();
var arr = [1,2,3];
var nullObj = null;

console.log('====isString====');
console.log(isString(str));


console.log('====isDate====');
console.log(isDate(date));


console.log('====isArray====');
console.log(isArray(arr));


console.log('====isNull====');
console.log(isNull(nullObj));



//函数作为参数，函数作为返回值 单例模式

var getSingle = function(fn){
    var res;
    return function(){
        return res || (res = fn.apply(this,arguments));
    }
}

//getSingle的参数是一个函数
//getSingle的返回值也是一个函数
//res保存了fn的结果，
//res因为在闭包环境中，不会被销毁
//在第二次等后面的调用中，res已经被赋值过，就会返回之前的值，函数不会被再次调用

var getStr = getSingle(function(){
    return new String('123')
});

var str1 = getStr();
var str2 = getStr();

console.log(str1===str2);



































