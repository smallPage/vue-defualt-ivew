/**
 * 设置cookie信息
 * @param {[type]} key   标识
 * @param {[type]} value 值
 */
function set(key, value) {
	// 缓存过期时间
	let Days = 30
	let exp = new Date()
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
	document.cookie = key + '=' + escape(value) + ';expires=' + exp.toGMTString() + ';path=/'
}

/**
 * 获取cookie值
 * @param  {[type]} key 标识
 * @return {[type]}     值
 */
function get(key) {
	let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)')
	let reg = arr
	arr = document.cookie.match(reg)
	if (arr) {
		return unescape(arr[2])
	}else{
		return null
	}
}

/**
 * 删除Cookie项
 * @param  {[type]} key 标识
 */
function del(key) {
	let exp = new Date()
	exp.setTime(exp.getTime() - 1)
	let cval = this.get(key)
	if (cval != null) {
		document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString() + ';path=/'
	}
}

export default {
	set, get, del
}