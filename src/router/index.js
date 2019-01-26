import Vue from 'vue'
import Router from 'vue-router'
import cookie from '@/utils/cookie'
import store from '@/store'

import * as types from '@/store/mutation-types'

const Index = () => import('@/components/index')

const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar');
const Footer = () => import('@/components/common/Footer')
const NotFoundComponent = () => import('@/components/common/NotFoundComponent')
const devComponent = () => import('@/components/dev')

import { routerMode } from '@/config/env'

// 账户模块路由配置
import accountRouters from '@/router/modules/account';


// baidu模块路由配置
import baiduRouters from '@/router/modules/baidu';

// 企业模块路由配置
import companyRouters from '@/router/modules/company';
// 专利模块路由配置
import patentRouters from '@/router/modules/patent';
// 上市公司财报模块路由配置
import finacialReportRouters from '@/router/modules/financialReport';
// 招聘模块路由配置
import recuitRouters from '@/router/modules/recuit';



Vue.use(Router)

var router = new Router({
  mode: routerMode,
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes: [
    { path: '*', component: NotFoundComponent, meta: { showHeader: false } },
    {
      path: '/',
      name: 'index',
      redirect: { name: 'company', meta:{ title: '企业数据', sidebarSelected: '1-1' }},
      // components: {
      //   default: Index,
      //   header: Header,
      //   sidebar: Sidebar,
      //   footer: Footer
      // },
      // meta: { title: '首页', headerSelected: 1 }
    }, {
      path: '/dev',
      name: 'dev',
      components: {
        default: devComponent,
        header: Header,
        sidebar: Sidebar,
        footer: Footer
      },
      meta: { title: '页面开发中', headerSelected: 1 }
    }
  ]
})

// 应用模块路由配置
router.addRoutes(accountRouters);
router.addRoutes(baiduRouters);


router.addRoutes(companyRouters);
router.addRoutes(patentRouters);
router.addRoutes(finacialReportRouters);
router.addRoutes(recuitRouters);


// router.addRoutes(iframeRouters);
// router.addRoutes(loginRouters);


router.beforeEach(function (to, from, next) {

  // let md5 = to.query.md5;
  // if (md5 && !store.state.global.token  && to.path != '/login') {
  //   cookie.del('token');
  //   store.dispatch('convertToken', { md5: md5, next: next, path: to.path });
  // } else if (!cookie.get('token') && to.path != '/login') {
  //   next('login');
  // } else if (cookie.get('token') && !store.state.global.token && to.path != '/login') {
  //   store.dispatch('parseToken', { token: cookie.get('token'), next: next, toPath: to.path });
  // } else {
  //   document.body.scrollTop = 0;
  //   next();
  // }

  document.body.scrollTop = 0;
    next();

});

export default router;
