import fetch from '@/config/fetch'

/**
 * 抓取LOG列表
 * @return {[type]} [description]
 */
export const fetchList = (params) => fetch('log', params);

export default {
  fetchList
}
