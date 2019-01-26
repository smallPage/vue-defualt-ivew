import fetch from '@/config/fetch'

/**
 * 抓取用户列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('news', params);

/**
 * 用户注册
 * @return {[type]} [description]
 */
export const reg = (params) => fetch('reg', params, 'POST');

/**
 * 用户登录
 * @return {[type]} [description]
 */
export const login = (params) => fetch('login', params, 'POST');

/**
 * 解析TOKEN获取用户
 * @return {[type]} [description]
 */
export const parseToken = (params) => fetch('token/parse', params, 'POST');

/**
 * 转换TOKEN
 * @return {[type]} [description]
 */
export const convertToken = (params) => fetch('token/convert/parse/{md5}', params, 'GET');

/**
 * 找回密码
 * @return {[type]} [description]
 */
export const forgotPwd = (params) => fetch('forgetPwd', params, 'POST');

/**
 * 修改密码
 * @return {[type]} [description]
 */
export const modifyPwd = (params) => fetch('modfiyPwd', params, 'PUT');


export default {
  fetchList, reg, login, parseToken, convertToken, forgotPwd, modifyPwd
}
