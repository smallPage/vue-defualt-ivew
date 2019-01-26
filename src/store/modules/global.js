/**
 * Created by liuyao on 2017/09/27.
 */

import * as types from '@/store/mutation-types'
import cookie from '@/utils/cookie'
import { accountAPI } from '@/api'

// import { loginAPI } from '@/api'

import {
	baseUrl
} from '@/config/env'

const state = {
	token: '',
	loginedUser: { },
	loading: false
}

const mutations = {
	[types.SET_LOGINED_USER](state, payload) {
		state.loginedUser = payload.loginedUser;
	},
	[types.SET_LOADING](state, payload) {
		state.loading = payload.loading;
	},
	[types.SET_TOKEN](state, payload) {
		state.token = payload.token;
	}
}

const actions = {
	userIsLogin() {
		// loginAPI.isLogin().then((res) => {
		// 	if (res.code == 0) {
		// 		console.log("当前用户已登录.")
		// 	}
		// });
	},
	setLoading({ commit }, status) {
		commit(types.SET_LOADING, { loading: status })
	},
	setLoginedUser({ commit }, status) {
		commit(types.SET_LOGINED_USER, { loginedUser: status })
	},
	setToken({ commit }, status) {
		commit(types.SET_TOKEN, { token: status })
	},
	userLogout({ commit }, status) {
        cookie.del('token');
		commit(types.SET_TOKEN, { token: '' })
		commit(types.SET_LOGINED_USER, { loginedUser: {} })
	},
	parseToken({ commit }, params) {
		let next = params.next;
		accountAPI.parseToken({ token: params.token }).then(res => {
			if (res.code == 0) {
				commit(types.SET_TOKEN, { token: params.token });
				commit(types.SET_LOGINED_USER, { loginedUser: res.data.user });
				commit(types.SET_LOADING, { loading: false });
				next();
	        } else {
	        	next('login')
	        }
		})
	},
	convertToken({ commit }, params) {
		let next = params.next;
		accountAPI.convertToken({ md5: params.md5 }).then(res => {
			if (res.code == 0) {
        		cookie.set('token', res.data.token);
				next(params.path || 'user');
	        } else {
	        	next('login')
	        }
		})
	}
}

export default {
	state, mutations, actions
}