'use strict'

import {
	baseUrl,
	httpProps
} from './env'

import store from '@/store'
import cookie from '@/utils/cookie'

import axios from 'axios'
import _ from 'lodash'


axios.interceptors.request.use(config => {
	let token = store.state.global.token || cookie.get('token');
	if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers['x-access-token'] = `${token}`;
    }
	return config
}, error => {
	return Promise.reject(error)
})

axios.interceptors.response.use(response => {
	return response
}, error => {
	return Promise.resolve(error.response)
})

function checkStatus(response) {
	// loading
	// 如果http状态码正常，则直接返回数据
	if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
		return response
		// 如果不需要除了data之外的数据，可以直接 return response.data
	}
	// 异常状态下，把错误信息返回去
	return {
		code: -404,
		status: -404,
		msg: '网络异常'
	}
}

function checkCode (res) {
	// 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
	if (res.status === -404) {
		console.log(res.msg)
	}
	if (res.data && res.data.error_msg) {
		console.log(res.data.error_msg)
	}
	return res
}

export default async(url = '', data = {}, type = 'GET', method = 'fetch', defaultBaseUrl = '') => {
	let _baseUrl = defaultBaseUrl || baseUrl;
    if (_.isObject(data)) {
		_.forIn(data, function(value, key) {
			let _key = '{' + key + '}';
			if (url.indexOf(_key) > -1) {
				data = _.omit(data, key);
				url = url.replace('{' + key + '}', value);
			}
		});
    }
	type = type.toLowerCase();
	if (type === 'POST' || type === 'post' || type === 'PUT' || type === 'put') {
		return axios({
			method: type, baseURL: _baseUrl, url: url, data: JSON.stringify(data), timeout: httpProps.requestTimeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/json; charset=UTF-8'
			}
		}).then((response) => {
			return checkStatus(response);
		}).then((res) => {
			return checkCode(res);
		}).then((res) => {
			return res.data;
		});
	} else {
		return axios({
			method: type, baseURL: _baseUrl, url: url, params: data, timeout: httpProps.requestTimeout,
			headers: {
				'X-Requested-With': 'XMLHttpRequest'
			}
		}).then((response) => {
			return checkStatus(response);
		}).then((res) => {
			return checkCode(res);
		}).then((res) => {
			return res.data;
		})
	}
}
