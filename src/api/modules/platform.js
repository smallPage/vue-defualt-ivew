import fetch from '@/config/fetch'

/**
 * 抓取平台列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('platform', params);

/**
 * 抓取平台详情
 * @return {[type]} [description]
 */
export const fetchDetail = (params) => fetch('platform/{num}', params);

/**
 * 抓取平台下拉框值
 * @return {[type]} [description]
 */
export const fetchSelectAll = () => fetch('platform/selectAll');

/**
 * 保存平台
 * @return {[type]} [description]
 */
export const save = (params) => fetch('platform', params, 'POST');

/**
 * 修改平台
 * @return {[type]} [description]
 */
export const modify = (params) => fetch('platform', params, 'PUT');

/**
 * 删除平台
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('platform', params, 'DELETE');

export default {
  fetchList, fetchDetail, fetchSelectAll, save, modify, remove
}
