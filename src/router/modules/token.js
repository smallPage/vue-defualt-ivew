const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const TokenList = () => import('@/components/token/list')

let routes = [
  {
    path: '/token',
    name: 'token',
    components: {
      default: TokenList,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: 'Token列表', sidebarSelected: '1-5' }
  }
];

export default routes;
