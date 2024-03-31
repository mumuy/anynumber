# AnyNumber 大数浮点数计算

## 下载 & 安装

该 Javascript 库 / 模块可以用于前端也可以用于后端 Nodejs 中。

1. 直接下载anynumber.js，然后使用 `<script>`标签引入，可以得到全局函数 `AnyNumber`.
2. 使用 npm 进行包管理，具体为：

    > **npm install anynumber**

然后使用 `require` 引入模块

```js
var AnyNumber = require("anynumber");
```

## AnyNumber() 初始化
```js
运行：AnyNumber(2.4e8)
// => '240000000'
```

## toFormat() 返回格式化数值
```js
运行：AnyNumber(1000000.123456).toFormat(2)
// => '1,000,000.12'
```

## toFixed() 精确度小数点后n位
```js
运行：AnyNumber(3.1415926535).toFixed(2)
// => '3.14'
```

## toString() 返回字符串
```js
运行：AnyNumber(1.2e3).toString()
// => '1200'
```

## toNumber() 返回原生Number对象
```js
运行：AnyNumber('1.28e3').toNumber()
// => 1280
```

## add() 加法运算
```js
运行：AnyNumber('0.1').add('0.2').value
// => '0.3'
```

## subtract() 减法运算
```js
运行：AnyNumber('100').subtract('0.5').value
// => '99.5'
```

## multiply() 乘法运算
```js
运行：AnyNumber('3').multiply('2').value
// => '6'
```

## divide() 除法运算
```js
运行：AnyNumber('100').divide('4').value
// => '25'
```

## mod() 取余运算
```js
运行：AnyNumber('10').mod('3').value
// => '1'
```

## sqrt() 开方运算
```js
运行：AnyNumber('16').sqrt().value
// => '4'
```

## pow() 幂运算
```js
运行：AnyNumber('10').pow('2').value
// => '100'
```
