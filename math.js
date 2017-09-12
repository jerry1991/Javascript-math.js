
// 修复JS加减乘除精度损失问题， 支持字符串相加， 如果是负数最好括号再调用该方法或定义成变量 
// 一般使用: var a = 0.1; var b = a.add(0.2).subtract(0.05).multiply(20).divide(30);
// 字符串使用如: "-35.4".add("35.4")   负数数字相加: (-35.4).add(35.4) 或 35.4.add((-35.4)) 
var calc = (function () {
    function isInteger(obj) {
        return Math.floor(obj) === obj
    }
    function toInteger(floatNum) {
        var ret = { times: 1, num: 0 }
        if (isInteger(floatNum)) {
            ret.num = floatNum
            return ret
        }
        var strfi = floatNum + '';
        var dotPos = strfi.indexOf('.');
        var len = strfi.substr(dotPos + 1).length;
        var times = Math.pow(10, len);
        var intNum = parseInt(floatNum * times < 0 ? (floatNum * times - 0.5) : (floatNum * times + 0.5), 10);
        ret.times = times;
        ret.num = intNum;
        return ret;
    }
    function operation(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
   
        var o1 = toInteger(a);
        var o2 = toInteger(b);
        var n1 = o1.num;
        var n2 = o2.num;
        var t1 = o1.times;
        var t2 = o2.times;
        var max = t1 > t2 ? t1 : t2;
        var result = null;
        switch (op) {
            case 'add':
                if (t1 === t2) {
                    result = n1 + n2;
                } else if (t1 > t2) {
                    result = n1 + n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) + n2;
                }
                return result / max;
            case 'subtract':
                if (t1 === t2) {
                    result = n1 - n2
                } else if (t1 > t2) {
                    result = n1 - n2 * (t1 / t2);
                } else {
                    result = n1 * (t2 / t1) - n2;
                }
                return result / max;
            case 'multiply':
                result = (n1 * n2) / (t1 * t2);
                return result;
            case 'divide':
                result = (n1 / n2) * (t2 / t1);
                return result;
        }
    }
    Number.prototype.add = function (a) {
        return operation.apply(null, [this, a, "add"]);
    }
    String.prototype.add = Number.prototype.add;

    Number.prototype.subtract = function (a) {
        return operation.apply(null, [this, a, "subtract"]);
    }
    String.prototype.subtract = Number.prototype.subtract;

    Number.prototype.multiply = function (a) {
        return operation.apply(null, [this, a, "multiply"]);
    }
    String.prototype.multiply = Number.prototype.multiply;

    Number.prototype.divide = function (a) {
        return operation.apply(null, [this, a, "divide"]);
    }
    String.prototype.divide = Number.prototype.divide;
})();