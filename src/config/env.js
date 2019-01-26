/**
 * 配置编译环境和线上环境之间的切换
 */

// baseUrl: 域名地址
// let baseUrl = 'http://172.16.1.46:10043/';
// let baseUrl = 'http://172.16.1.84:8011/api/';
let baseUrl = 'http://192.168.21.99:10043/';
// let baseSolrUrl = 'http://localhost:8011/solr/gxhs_website/';

// let baseUrl = 'http://www.ndrcbd.org/api/';
// let baseSolrUrl = 'http://www.ndrcbd.org/solr/gxhs_website/';

// ajax请求通用配置
let httpProps = {
	// 请求超时时间 10s.
	requestTimeout: 10000
};
// 设置是否使用mock生成数据, true为使用;   系统会在正式环境中自动设置为不使用.
let useMock = false;

// 路由模式, history / hash. hash会在url中添加 /#/. history需保证浏览器支持
let routerMode = 'history';

// 图片服务器根路径
//let imgBaseUrl = 'http://localhost:10001/';
let imgBaseUrl = 'http://p0twrrz2b.bkt.clouddn.com/';


if (process.env.NODE_ENV == 'development') {
	this.baseUrl = 'http://localhost:10011/api/';
	//this.baseUrl = 'http://www.ndrcbd.org/api/';
} else if (process.env.NODE_ENV == 'production') {
	this.baseUrl = 'http://localhost:10011/api/';
	//this.baseUrl = 'http://www.ndrcbd.org/api/';
	this.useMock = false;
}

export {
	baseUrl,
	// baseSolrUrl,
	httpProps,
	routerMode,
	imgBaseUrl,
	useMock
}
