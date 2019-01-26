// 引入mockjs
import Mock from 'mockjs'

import {
    baseUrl,
    useMock
} from '@/config/env'

// 获取 mock.Random 对象
const Random = Mock.Random;

// mock一组数据
const produceNewsData = function() {
    console.log(333);
    let articles = [];
    for (let i = 0; i < 10; i++) {
        let newArticleObject = {
            title: Random.csentence(5, 30), //  Random.csentence( min, max )
            thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
            author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
            dateYMD: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            date: Random.date() + ' ' + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            content: Random.cparagraph(300)
        }
        articles.push(newArticleObject)
    }
    return {
      code: 0,
      data: {
        articles: articles
      }
    }
}

// 需要添加mock拦截, 只需要往此数组里添加记录即可
// path(必填): 拦截路径, 对应ajax path; method: 对应请求方法: func: 对应该数据处理Mock函数
let mocks = [
    { path: 'news/index', method: 'get', func: produceNewsData },

    // 其他写法, 例子
    { path: 'test/a', method: 'get', func: (params) => { console.log('mock: ' + JSON.stringify(params)) } },
    { path: 'test/b' },
    { path: 'test/c', method: 'post', func: (params) => { console.log('mock, request body: ' + JSON.stringify(params)) } }
]

// 此处会根据mocks数组中定义进行拦截.
if (process.env.NODE_ENV == 'development' && useMock) {
    mocks.map((_mock, i) => {
        Mock.mock(baseUrl + _mock.path, _mock.method ? _mock.method : 'get', _mock.func ? _mock.func : () => { console.log(' 未找到 mock 相关处理函数'); return {} });
    });
}


// Mock.mock(baseUrl + 'solution/index', 'get', solutionoData);
// Mock.mock(baseUrl+ 'product/index','get',productData);


// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock(baseUrl + 'news/index', 'get', produceNewsData);
// Mock.mock(baseUrl + 'http://www.a.com/test', 'get', produceNewsData);
// Mock.mock('http://localhost:10011/customized/save', 'post', produceNewsData);
