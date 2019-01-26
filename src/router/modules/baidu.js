const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const BaiduPage = () => import('@/components/baidu/index')
// const UserAdd = () => import('@/components/user/add')
// const UserEdit = () => import('@/components/user/edit')

let routes = [
  {
    path: '/baidu',
    name: 'baidu',
    components: {
      default: BaiduPage,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: '用户列表', sidebarSelected: '1-2' }
  }
  // {
  //   path: '/user/add',
  //   name: 'userAdd',
  //   components: {
  //     default: UserAdd,
  //     header: Header,
  //     sidebar: Sidebar
  //   },
  //   meta: { title: '添加用户', sidebarSelected: '1-1', oprMode: 'add' }
  // }, {
  //   path: '/user/:num/edit',
  //   name: 'userEdit',
  //   components: {
  //     default: UserEdit,
  //     header: Header,
  //     sidebar: Sidebar
  //   },
  //   meta: { title: '编辑用户', sidebarSelected: '1-1', oprMode: 'edit' }
  // }
];

export default routes;
