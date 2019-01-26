import fetch from '@/config/fetch'

/**
 * 抓取角色列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('role', params);

/**
 * 抓取角色详情
 * @return {[type]} [description]
 */
export const fetchDetail = (params) => fetch('role/{num}', params);

/**
 * 抓取角色下拉框值
 * @return {[type]} [description]
 */
export const fetchSelectAll = () => fetch('role/selectAll');

/**
 * 保存角色
 * @return {[type]} [description]
 */
export const save = (params) => fetch('role', params, 'POST');

/**
 * 修改角色
 * @return {[type]} [description]
 */
export const modify = (params) => fetch('role', params, 'PUT');

/**
 * 删除角色
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('role', params, 'DELETE');

export default {
  fetchList, fetchDetail, fetchSelectAll, save, modify, remove
}
