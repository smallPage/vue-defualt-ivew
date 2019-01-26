import fetch from '@/config/fetch'

/**
 * 抓取资源列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('resource', params);

/**
 * 抓取资源详情
 * @return {[type]} [description]
 */
export const fetchDetail = (params) => fetch('resource/{num}', params);

/**
 * 保存资源
 * @return {[type]} [description]
 */
export const save = (params) => fetch('resource', params, 'POST');

/**
 * 修改资源
 * @return {[type]} [description]
 */
export const modify = (params) => fetch('resource', params, 'PUT');

/**
 * 删除资源
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('resource', params, 'DELETE');

/**
 * 抓取资源树
 * @return {[type]} [description]
 */
export const fetchTree = (params) => fetch('resource/test', params);

/**
 * 通过平台编号抓取资源树
 * @return {[type]} [description]
 */
export const getTreeByPlatformNum = (params) => fetch('resource/getTreeByPlatformNum/{num}', params, 'GET');

/**
 * 通过平台编号抓取资源树
 * @return {[type]} [description]
 */
export const getTreeByPlatformNumManage = (params) => fetch('resource/getTreeByPlatformNum/manage/{num}', params, 'GET');

export default {
  fetchList, fetchDetail, save, modify, remove, fetchTree, getTreeByPlatformNum, getTreeByPlatformNumManage
}
