import {doAction} from './action.js';

// 精确度调整
export function toFixed(number,fixed){
    fixed = Math.max(0,fixed);
    let zero = new Array(fixed).fill('0').join('');
    number += number.includes('.')?zero:'.'+zero;
    let index = number.indexOf('.')+fixed;
    let num = +number.charAt(index+1);
    number = number.substring(0,index+1);
    if(num>=5){
        let other = '0.'+zero.substring(1)+'1';
        number = doAction(number,'+',other);
    }
    return number;
}

// 数值格式化
export function toFormat(number,fixed = 2){
    let reg = new RegExp('([\\d,]+\\.?(\\d{0,'+fixed+'})?).*');                                         //位数截取
    let str = number.replace(/[^\d\.]/g,'').replace(/^[^\d]/,'').replace(reg,'$1').replace(/\.$/,'');    //清除格式
    let value = (+str).toFixed(fixed);
    let result = '';
    if(str){
        var number = value.split('.')[0];
        if(number){ //处理整数部分
            number = number.replace(/\d(?=(?:\d{3})+\b)/g,'$&,');
        }
        result = str.replace(/(\d)*(\.\d*)?/,number+'$2');  //和小数部分拼接
    }
    return result;
}

// 科学计数法转自然
export function toValueString(number){
    let match = number.toString().match(/([\+\-]?\d*\.\d*|[\+\-]?\d*)e([\+\-]?\d*\.\d*|[\+\-]?\d*)/);
    let nPart = BigInt(1);
    let ePart = BigInt(1);
    if(match){
        nPart = match[1];
        if(+match[2]>0){
            ePart = '1'+(new Array(+match[2]).fill('0').join(''));
        }else if(+match[2]<0){
            ePart = doAction('1','/',BigInt('1'+(new Array(Math.abs(match[2]))).fill('0').join('')));
        }
        return doAction(nPart,'*',ePart);
    }
    return number.toString();
};
