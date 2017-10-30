/*
 * hoyuet常用js函数
 */


/*
 * 完整的数据类型检测方法typeOf
 * o表示检测的值
 */
function typeOf(o){
	//获取对象的toString方法
	var _toString = Object.prototype.toString;
	//列举基本数据类型和内置对象类型，可以进一步补充该数组的检测数据类型范围
	var _type = {
		"undefined":"undefined",
		"number":"number",
		"boolean":"boolean",
		"string":"string",
		"[object Function]":"function",
		"[object RegExp]":"regexp",
		"[object Array]":"array",
		"[object Date]":"date",
		"[object Error]":"error"
	};
	//返回基本数据类型或数组类型或null
	return _type[typeof o] || _type[_toString.call(o)] ||(o? "object" : "null")
}

/*
 * 获取字符串的字节数
 */
function getStrBits(str){
	var b = 0, l = str.length;
	if(l){
		for(var i = 0; i < l; i++){
			if(str.charCodeAt(i)>255){
				b+=2;
			}else{
				b++;
			}
		}
		return b;
	}else{
		return 0;
	}
}

/*
 * 数组-数字排序
 * l表示从小到大，r表示从大到小
 */
function sortNuml(arr){
	return arr.sort(function(a,b){
		return a-b;
	});
}
function sortNumr(arr){
	return arr.sort(function(a,b){
		return b-a;
	});
}

/*
 * 数组去重
 */
function uniqueArr(arr){
	var res=[],
		json={},
		len=arr.length;
		
	for(var i=0;i<len;i++){
		if(!json[arr[i]]){
			json[arr[i]]=1;
			res.push(arr[i]);
		}
	}
	return res;
}

/*
 * 生成随机数
 */
function randomBetween(min,max){
	return min+(Math.random()*(max-min));
}

/*
 * 操作cookie
 * setCookie,getCookie
 */
function setCookie(name,val,days){
	var d=new Date();
	d.setTime(d.getTime()+(days*24*60*60*1000));
	var expires='expires='+d.toUTCString();
	document.cookie=name+'='+val+'; '+expires;
}
function getCookie(cname){
	var name=cname+'=';
	var ca=document.cookie.split(';');
	var len=ca.length;
	for(var i=0;i<len;i++){
		var c=ca[i];
		while(c.charAt(0)==' '){
			c=c.substring(1);
		}
		if(c.indexOf(name)!=-1){
			return c.substring(name.length,c.length)
		}
	}
	return '';
}

/*
 * 获取数组的最大值和最小值
 */
function maxInArr(arr){
	return Math.max.apply(Math,arr);
}
function minInArr(arr){
	return Math.min.apply(Math,arr);
}

/*
 * 清除两边空格
 */
function trimStr(str) {
    var reExtraSpace = /^\s*(.*?)\s+$/;
    return str.replace(reExtraSpace, "$1")
}

/*
 * 将数字转换为大写金额,精确到小数点前12位，小数点后两位
 */
function numToRmb(n) {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
}
































































