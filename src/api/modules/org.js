/**
 * Created by 17600 on 2018/6/26.
 */
import fetch from '@/config/fetch'

/**
 * 获取组织机构tree数据
 * @return {[type]} [description]
 */
export const getOrgTree = (params) => fetch('org/index', params, 'GET');

/**
 * 抓取区域tree数据
 * @return {[type]} [description]
 */
export const getAreaTree = (params) => fetch('org/getArea', params, 'GET');

/**
 * 抓取组织机构详情
 * @return {[type]} [description]
 */
export const getOrgMsg = (params) => fetch('org/getOrgMsg', params ,'GET');

/**
 * 保存 // 修改平台
 * @return {[type]} [description]
 */
export const saveModify = (params) => fetch('org/save', params, 'GET');

/**
 * 修改平台
 * @return {[type]} [description]
 */
// export const modify = (params) => fetch('platform', params, 'PUT');

/**
 * 删除组织机构
 * @return {[type]} [description]
 */
export const remove = (params) => fetch('org/remove', params, 'GET');

export default {
  getOrgTree , getAreaTree , getOrgMsg , saveModify , remove
}
