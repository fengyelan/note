/*
 *@desc:分时函数 
 *@param ary:创建节点时需要的数据 fn:创建节点逻辑的函数 count:每一批创建的节点数量
 */
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
            if(ary.length===0){ //如果全部节点已经创建好了就关闭定时器
                clearInterval(timer);
                return;
            }
            start();
        },200);
    }
}

//test
var ary = [];
for(var i=0;i<10000;i++){
    ary.push(i);
}

var renderList = timeChunk(ary,function(i){
    var oDiv = document.createElement('div');
    oDiv.innerHTML = i;
    document.body.appendChild(oDiv);
},8);

renderList();