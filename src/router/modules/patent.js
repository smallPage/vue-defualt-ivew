/**
 * Created by 17600 on 2018/7/4.
 */
const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const PatentPage = () => import('@/components/patent/index')

let routes = [
  {
    path: '/patent',
    name: 'patent',
    components: {
      default: PatentPage,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: '专利数据', sidebarSelected: '1-2' }
  }
];

export default routes;
