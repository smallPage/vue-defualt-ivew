import fetch from '@/config/fetch'

/**
 * 抓取用户列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('user', params);

/**
 * 抓取用户详情
 * @return {[type]} [description]
 */
export const fetchDetail = (params) => fetch('user/{num}', params);

/**
 * 保存用户
 * @return {[type]} [description]
 */
export const save = (params) => fetch('user', params, 'POST');

/**
 * 修改用户
 * @return {[type]} [description]
 */
export const modify = (params) => fetch('user', params, 'PUT');

/**
 * 修改密码
 * @return {[type]} [description]
 */
export const modifyPwd = (params) => fetch('user/modify/pwd', params, 'PUT');

/**
 * 删除用户
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('user', params, 'DELETE');

export default {
  fetchList, fetchDetail, save, modify, modifyPwd, remove
}
