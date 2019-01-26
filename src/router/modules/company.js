/**
 * Created by 17600 on 2018/7/4.
 */
const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const CompanyPage = () => import('@/components/company/index')

let routes = [
  {
    path: '/company',
    name: 'company',
    components: {
      default: CompanyPage,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: '企业数据', sidebarSelected: '1-1' }
  }
];

export default routes;
