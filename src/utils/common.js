import _ from 'lodash'

// 校验参数是否为数组
function isArray(value) {
	let flag = false;
	if (value instanceof Array || 
		(!(value instanceof Object) && 
		(Object.prototype.toString.call((value)) == '[object Array]') || 
		typeof value.length == 'number' && 
		typeof value.splice != 'undefined' && 
		typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice'))) { 
		flag = true; 
	}
	return flag;
}

// 补0
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

function ellipsisConvert(val, len = 100) {
    val = val ? val.replace(/<[^>]+>/g, "") : '';
    return val && val.length > len ? val.substr(0, len) + '...' : val;
}

function isEmpty(val) {
    return val ? _.isEmpty(_(val).trim()) : true;
}

function objConvert(obj, actions) {
    if (!obj) return null;
    if (!actions) return null;
    var res = {};
    normalizeMap(actions).forEach(function (ref) {
        res[ref.key] = obj[ref.key]
    });
    return res;
}

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

export default {
	isEmpty, isArray, objConvert, ellipsisConvert
}