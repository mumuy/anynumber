import prototype from './prototype.js';

let AnyNumber = function(expression){
    return new AnyNumber.prototype.init(expression);
};
AnyNumber.prototype = prototype;
prototype.init.prototype = prototype;

export default AnyNumber;
