import {doAction} from './action.js';

// 小数转整数表达
export function getObject(number){
    let value = number.toString().replace(/^-/,'');
    let isNegative = number.toString().indexOf('-')==0;
    let length = value.length;
    let index = value.indexOf('.');
    let t = index>-1?length - index - 1:0;
    value = value.replace('.','');
    return {
        'value':BigInt((isNegative?'-':'')+value),
        'time':BigInt('1'+(new Array(t).fill('0').join('')))
    };
};
// 获取两数的公倍数
export function getGroup(number1,number2){
    let object1 = getObject(number1);
    let object2 = getObject(number2);
    let time = object1.time*object2.time;
    let value1 = object1.value*object2.time;
    let value2 = object2.value*object1.time;
    return {
        'value1':value1,
        'value2':value2,
        'time1':object2.time,
        'time2':object1.time,
        'time':time
    };
};
