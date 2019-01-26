import fetch from '@/config/fetch'

/**
 * 抓取TOKEN列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('token', params);

export default {
  fetchList
}
