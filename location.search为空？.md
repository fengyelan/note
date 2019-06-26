### window.location.search为空的情况

访问链接

`http://localhost:8081/manageSystem/#/resource/reserveAccount?clientId=123`

```
window.location.search  
```
得到的是空字符串

```
window.location.hash  
```

得到的是 `#/resource/reserveAccount?clientId=123`

如果？是在#之后，拿到的是search就是空字符串,因为上面的链接带有的参数是属于hash的内容


