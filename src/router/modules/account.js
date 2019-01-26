const Dev = () => import('@/components/dev')
const Header = () => import('@/components/common/Header')

let routes = [
  {
    path: '/dev',
    name: 'dev',
    components: {
      default: Dev,
      header: Header
    },
    meta: {title: '首页'}
  }
];

export default routes;
