import {getObject,getGroup} from './number.js';
import {toFixed} from './format.js';

// 四则混合运算
export function doAction(number1,action,number2){
    let group = getGroup(number1,number2);
    let object = null;
    let time = 1;
    let number = 1;
    let length = (group.time.toString().length - 1);
    if(action=='+'){
        object = getObject(group.value1+group.value2);
        time = group.time;
    }else if(action=='-'){
        object = getObject(group.value1-group.value2);
        time = group.time;
    }else if(action=='*'){
        object = getObject(group.value1*group.value2);
        time = group.time*group.time;
    }else if(action=='/'){
        let max = BigInt('1'+(new Array(36+length).fill('0').join('')));
        object = getObject(group.value1*max/group.value2);
        time = max;
    }else if(action=='**'){
        object = getObject(number1**number2);
        time = object.time;
    }else if(action=='%'){
        let integer = Math.floor(Math.abs(number1)/Math.abs(number2));
        let isNegative = Math.floor(number1/number2).toString().indexOf('-')==0;
        let maxNumber = doAction(Math.abs(integer),'*',Math.abs(number2));
        let diff = doAction(Math.abs(number1),'-',maxNumber);
        return (isNegative?'-':'')+diff;
    }else{
        return NaN;
    }
    let value = object.value.toString().replace(/^-/,'');
    let isNegative = object.value.toString().indexOf('-')==0;
    let resultArray = (new Array(36+length)).fill('0').concat(value.split(''));
    let index = resultArray.length - (time.toString().length - 1);;
    resultArray.splice(index,0,'.');
    let result = toFixed(resultArray.join(''),32).replace(/^0+/,'').replace(/(?<=\.\d*)0*$/,'').replace(/\.0*$/,'').replace(/^\./,'0.');
    return (isNegative?'-':'')+result;
};
