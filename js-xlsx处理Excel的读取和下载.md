#### js-xlsx处理Excel的上传和下载

[js-xlsx](https://github.com/SheetJS/js-xlsx)

  安装

 ```
npm install xlsx
 ```

  引用

 ```
const XLSX = require('xlsx');
 ```



#####Excel的上传
+ 上传一份excel文件

  ```
   <input type="file" @change="importExcel"/>
  ```
  通过绑定change事件，获得当前上传的文件

  ```
 const file = event.target.files[0];
  ```

+ 读取Excel文件

  需要 FileReader的配合进行读取

  ```
const reader = new FileReader();
reader.onload = function (e) {
    const data = e.target.result;
    //data是二进制字符串
};

  ```
+ 获取Excel文档,即就是获得 workbook 对象。workbook 对象指的是整份 Excel 文档。通过XLSX.read 读取。

 ```
//可以配置参数type，告诉库文件以怎么方式解析数据
const wb = XLSX.read(data, {type: 'binary'});
 ```
+ 获取Excel中所有表，每张表对应的就是一个worksheet 对象。

 ```
//所有表名
const sheetNames = wb.SheetNames;
//根据表明获取每一张表
const ws = wb.Sheets[wb.SheetNames[0]]
```
转化Excel单元格中的数据到json数组数据

 ```
//获取到的数据是一个数组，数字的每个元素是每一行的数据，也是一个数组。
//代表每一行数据的数组，里面元素是单元格的数据。
//获取某种格式的数据可以根据后面的花括号的配置项进行参数配置。
const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0], {header: 1})
```

#####Excel下载
+ 需要导出的数据构建为一个特定的数据结构

  其中A1，A2...对应的值是excel表格中第一列的单元格的数据，

  B2,B3...对应的值是excel表格中第二列的单元格的数据...

  ```
const data  = {
		A1: {v: "位置"},
		A2: {v: "位置1"},
		A3: {v: "位置2"},
		A4: {v: "位置3"},
		A5: {v: "位置4"},
		A6: {v: "位置5"},
		B1: {v: "ID"}
		B2: {v: "asdfgh_1550642051090|1"},
		B3: {v: "asdfgh_1550642051090|2"},
		B4: {v: "asdfgh_1550642051090|3"},
		B5: {v: "asdfgh_1550642051090|4"},
		B6: {v: "asdfgh_1550642051090|5"}
}
  ```

+ 构建 workbook 对象

 ```
// 必须要有这个范围才能输出，否则导出的 excel 会是一个空表
const outputPos = Object.keys(data);
const ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
const wb = {
        SheetNames: ['mySheet'], //保存的表标题
        Sheets: {
            'mySheet': Object.assign({},
                data, 
                {
                    '!ref': ref  
                })
        }
  };
  
 ```
+ 数据写入到表格
  
  ```
 const wbOut = XLSX.write(
 	wb,
   {
   			bookType: 'xlsx', 
   			bookSST: false, 
   			type: 'binary'
   	})
        
  ```      
+ 使用 Blob 创建一个指向类型化数组的URL
  
 ```
  const url = new Blob([s2ab(wbOut)])
  //二进制字符串转为ArrayBuffer对象
  function s2ab(s){
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
 ```
  

        

+ 通过创建a标签，模拟点击链接进行下载

 ```
//创建对象超链接,生成的超链接
//blob:http://localhost:3000/ced1d318-96c3-4eeb-8337-2640e41e60f4
const href = URL.createObjectURL(url); 
//绑定a标签
document.getElementById('apply').href = href;
//模拟点击实现下载
document.getElementById('apply').click(); 
//延时释放
setTimeout(function () { 
      URL.revokeObjectURL(url); //用URL.revokeObjectURL()来释放这个object URL
}, 100);
 ```

这里click之后不是跳转链接，而是下载是因为在a标签添加了download属性，download属性值是对应下载文件名，href属性url是一个下面blob开头的url字符串。


```
<a href="blob:http://localhost:3000/ced1d318-96c3-4eeb-8337-2640e41e60f4" download="aa123.xlsx" id="apply"></a>
```




