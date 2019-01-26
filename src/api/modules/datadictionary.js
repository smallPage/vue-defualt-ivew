import fetch from '@/config/fetch'

/**
 * 抓取字典列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('dictionary', params);

/**
 * 抓取字典详情
 * @return {[type]} [description]
 */
export const fetchDetail = (params) => fetch('dictionary/{pk}', params);

/**
 * 保存字典
 * @return {[type]} [description]
 */
export const save = (params) => fetch('dictionary', params, 'POST');

/**
 * 修改字典
 * @return {[type]} [description]
 */
export const modify = (params) => fetch('dictionary', params, 'PUT');

/**
 * 删除字典
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('dictionary', params, 'DELETE');

/**
 * 抓取字典项
 * @return {[type]} [description]
 */
export const fetchValues = (params) => fetch('dictionary/code/{code}', params);

export default {
  fetchList, fetchDetail, save, modify, remove, fetchValues
}
