### 浮点数精度问题 0.1+0.2为什么不等于0.3
```
0.1+0.2
在浏览器console回车的结果
0.30000000000000004
```
+ 64位精度，第一位是表示符号，接下来的11位表示整数部分，接下来的52位表示小数部分

```
记录最大小数位数maxLen：1
补最小小数位数的数和最大小数位数看齐
去小数点：'01'，'02'
相加是1，在和的结果的前面补'0'('0'的位数是最大小数位数)得到是add:'03'
slice截取并且加小数点add.slice(0,-maxLen)+'.'+add.slice(-maxLen);
得到的字符串转数字
```

### 关于setTimeout和setInterval的返回值
```
一个唯一的数字ID，这个ID传递给clearInterval()，clearTimeout() 以取消执行。
```

### Promise.race() 的实现
```
const p = Promise.race([p1, p2, p3]);
只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。
```

```
Promise.race = (promises) =>{
    promises = [...promises];
    return new Promise((resolve,reject)=>{
        if(promises.length){

        }else{
            for(let i=0;i<promise.length;i++){
                Promise.resolve(promise[i]).then((res)=>{
                    resolve(res);
                },(err)=>{
                    reject(err);
                })
            }
        }
    });
}
```
### jsonp的原理和实现
```
const jsonp = ({url,param,callback})=>{
    return new Promise((resolve,reject)=>{
        let script = document.createElement('script');
        window[callback] = function(data){
            resolve(data);
            document.body.removeChild(script);
        }
        param = {...param,callback};
        let paramArr = [];
        for(let key in param){
            paramArr.push(`${key}=${param[key]}`)
        }
        script.src=`${url}?${paramArr.join('&')}`;
        document.body.appendChild(script);
    });
}

json({
    url:'http://localhost:8080',
    param:{
        name:'yy',
        age:12
    },
    callback:'foo'
});
```

```
node express 有对应的json方法
// ?name=yy&age=12&callback=foo
res.jsonp({ user: 'tobi' })
// => foo({ "user": "tobi" })
```