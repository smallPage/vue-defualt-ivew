const Login = ()=> import('@/components/login/login');

let routes = [
  {
    path: '/login',
    name: 'login',
    components: {
      default: Login
    },
    meta: { title:'用户登录', top: false }
  }
];

export default routes;
