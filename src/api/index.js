/**
 * 此文件为后台API统一接口实现.
 * 如需写相应的代码, 请添加至 modules 目录下. 此目录只负责 模块引入 及 模块导出.
 * author: lyao
 */

// 账户API接口
import account from '@/api/modules/account'
// 用户API接口
import user from '@/api/modules/user'
// 资源API接口
import resource from '@/api/modules/resource'
// 角色API接口
import role from '@/api/modules/role'
// 平台API接口
import platform from '@/api/modules/platform'
// TOKEN API接口
import token from '@/api/modules/token'
// LOG API接口
import log from '@/api/modules/log'
// LOG API接口
import datdDictionary from '@/api/modules/datadictionary'
// ORG API接口
import org from '@/api/modules/org'

export {
	account as accountAPI,
	user as userAPI,
	resource as resourceAPI,
	role as roleAPI,
	platform as platformAPI,
	token as tokenAPI,
	log as logAPI,
	datdDictionary as dictionaryAPI,
  org as orgAPI
};
