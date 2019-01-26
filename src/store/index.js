/**
 * Created by liuyao on 2017/09/27.
 */
import Vue from 'vue';
import Vuex from 'vuex';

// 通用
import global from './modules/global'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        global
    },
    strict: debug
});