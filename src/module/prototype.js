import {toFixed,toFormat} from './method/format.js';
import {doAction} from './method/action.js';
import {parser} from './method/parser.js';

export default {
    value: null,
    init:function(expression){
        this.value = parser(expression.toString());
    },
    add(value){
        this.value = doAction(this.value,'+',value);
        return this;
    },
    subtract(value){
        this.value = doAction(this.value,'-',value);
        return this;
    },
    multiply(value){
        this.value = doAction(this.value,'*',value);
        return this;
    },
    divide(value,fixed){
        this.value = doAction(this.value,'/',value);
        return fixed?toFixed(this.value,fixed):this;
    },
    mod(value){
        this.value = doAction(this.value,'%',value);
        return this;
    },
    sqrt(){
        this.value = Math.sqrt(this.toNumber()).toString();
        return this;
    },
    pow(value){
        this.value = Math.pow(this.toNumber(),value).toString();
        return this;
    },
    toFormat(fixed){
        return toFormat(this.value,fixed);
    },
    toExponential(fixed){
        return this.toNumber().toExponential(fixed);
    },
    toFixed(fixed){
        return toFixed(this.value,fixed);
    },
    toString(){
        return this.value;
    },
    toNumber(){
        return +this.value;
    }
}
