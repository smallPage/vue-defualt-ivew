/**
 * Created by 17600 on 2018/7/4.
 */
const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const RecuitPage = () => import('@/components/recuit/index')

let routes = [
  {
    path: '/recuit',
    name: 'recuit',
    components: {
      default: RecuitPage,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: '招聘', sidebarSelected: '1-5' }
  }
];

export default routes;
