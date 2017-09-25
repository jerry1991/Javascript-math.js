
// 修复JS加减乘除精度损失问题， 支持字符串相加， 如果是负数最好括号再调用该方法或定义成变量 
// 一般使用: var a = 0.1; var b = a.add(0.2).subtract(0.05).multiply(20).divide(30);
// 字符串使用如: "-35.4".add("35.4")   负数数字相加: (-35.4).add(35.4) 或 35.4.add((-35.4)) 
var calc = (function () {
    Number.prototype.add = function(a) {
		return maths.apply(null, [this, a, 1]);
	}
	String.prototype.add = Number.prototype.add;

	Number.prototype.subtract = function(a) {
		return maths.apply(null, [this, a, 2]);
	}
	String.prototype.subtract = Number.prototype.subtract;

	Number.prototype.multiply = function(a) {
		return maths.apply(null, [this, a, 3]);
	}
	String.prototype.multiply = Number.prototype.multiply;

	Number.prototype.divide = function(a) {
		return maths.apply(null, [this, a, 4]);
	}
	String.prototype.divide = Number.prototype.divide;

	function maths(n1, n2, type) {
		var result, y, a, b, len1, len2, max;
		if (n2 == 0 && type == 4) { return 0 }
		a = String(n1);
		b = String(n2);
		len1 = a.split(".")[1] ? a.split(".")[1].length : 0;
		len2 = b.split(".")[1] ? b.split(".")[1].length : 0;
		max = len1 > len2 ? len1 : len2;
		a = Math.round(a * Math.pow(10, max));
		b = Math.round(b * Math.pow(10, max));
		switch (type) {
			case 1:
				result = a + b;
				break;
			case 2:
				result = a - b;
				break;
			case 3:
				result = a * b;
				break;
			case 4:
				result = a / b;
				break;
		}
		if (type == 1 || type == 2) {
			y = max;
		} else if (type == 3) {
			y = max * 2;
		} else {
			y = 0;
		}
		return result / Math.pow(10, y);
	}
})();