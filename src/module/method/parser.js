import {toValueString} from './format.js';
import {doAction} from './action.js';

// 解析表达式
export function parser(expression){
    let matchRule = [{      // 去除空格
        exp:/\s/g,
        fun:(...match)=>{
            return '';
        }
    },{                     // 科学计数法
        exp:/([\+\-]?\d*\.\d*|[\+\-]?\d*)e([\+\-]?\d*\.\d*|[\+\-]?\d*)/g,
        fun:(...match)=>{
            return toValueString(match[0]);
        }
    },{                     // +(-8)转-8；+(+8)转+8；
        exp:/\+\(([\+\-]\d*\.\d*|[\+\-]\d)\)/g,
        fun:(...match)=>{
            return match[1];
        }
    },{                     // -(-8)转+8；
        exp:/\-\(\-(\d*\.\d*|\d)\)/g,
        fun:(...match)=>{
            return '+'+match[1];
        }
    },{                     // -(+8)转-8；
        exp:/\-\(\+(\d*\.\d*|\d)\)/g,
        fun:(...match)=>{
            return '-'+match[1];
        }
    },{                     // 读取()内表达式
        exp:/\((.+)\)/g,
        fun:(...match)=>{
            return parser(match[1]);
        }
    },{                     // 乘除法
        exp:/(^\-\d*\.\d*|^\-\d+|\d*\.\d*|\d+)(\*\*|\*|\/|%)(\([\+\-]?\d*\.\d*|[\+\-]?\d+\))/g,
        fun:(...match)=>{
            return doAction(match[1],match[2],match[3]);
        }
    },{                     // 乘除法
        exp:/(^\-\d*\.\d*|^\-\d+|\d*\.\d*|\d+)(\*\*|\*|\/|%)([\+\-]?\d*\.\d*|[\+\-]?\d+)/g,
        fun:(...match)=>{
            return doAction(match[1],match[2],match[3]);
        }
    },{                     // 加减法
        exp:/(^\-\d*\.\d*|^\-\d+|\d*\.\d*|\d+)([\+\-])([\+\-]?\d*\.\d*|[\+\-]?\d+)/,
        fun:(...match)=>{
            return doAction(match[1],match[2],match[3]);
        }
    }];
    let doTask = function(expression){
        let result = expression;
        matchRule.forEach(function(rule){
            result = result.replace(rule['exp'],rule['fun']);
        });
        if(result!=expression){
            return doTask(result);
        }
        return result;
    };
    let result = doTask(expression);
    return result;
};
