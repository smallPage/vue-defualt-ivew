import Vue from 'vue'

let fns = [
    // 格式化时间
    {
        key: 'formatDate',
        fn: function(date, fmt) {
            if (!(date instanceof Date)) {
                date = new Date(date.replace("/-/g", "/"));
            }
            if (!date || !(date instanceof Date)) return date;
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            let o = {
                'M+': date.getMonth() + 1,
                'd+': date.getDate(),
                'h+': date.getHours(),
                'm+': date.getMinutes(),
                's+': date.getSeconds()
            };
            for (let k in o) {
                if (new RegExp(`(${k})`).test(fmt)) {
                    let str = o[k] + '';
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
                }
            }
            return fmt;
        }
    }
]

// 补0
function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

// 遍历集成到拦截器中
fns.map((_fn, i) => {
    Vue.filter(_fn.key, _fn.fn);
});

export default { }