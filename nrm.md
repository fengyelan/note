### nrm的使用
#### 全局安装nrm
```
npm i -g nrm
```
#### 列出所有的源
```
nrm ls
```

```
➜  note git:(master) nrm ls

* npm ---- https://registry.npmjs.org/
  cnpm --- http://r.cnpmjs.org/
  taobao - https://registry.npm.taobao.org/
  nj ----- https://registry.nodejitsu.com/
  rednpm - http://registry.mirror.cqupt.edu.cn/
  npmMirror  https://skimdb.npmjs.com/registry/
  edunpm - http://registry.enpmjs.org/
```
#### 切换需要使用的源
```
nrm use taobao
```

```
➜  note git:(master) nrm use taobao


   Registry has been set to: https://registry.npm.taobao.org/
```
#### 添加源
```
nrm add euro http://www.npmjs.eu/
```
```
➜  note git:(master) nrm add euro http://www.npmjs.eu/

    add registry euro success
```