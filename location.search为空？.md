###window.location.search为空的情况

访问链接`http://localhost:8081/manageSystem/#/resource/reserveAccount?clientId=123`

```
window.location.search  //''
```

```
window.location.hash  //'#/resource/reserveAccount?clientId=123'
```

如果？是在#之后，拿到的是search就是空字符串；否则在之前就是可以的

上面的链接带有的参数是属于hash的内容


