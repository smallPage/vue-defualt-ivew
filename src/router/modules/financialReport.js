/**
 * Created by 17600 on 2018/7/4.
 */
const Header = () => import('@/components/common/Header')
const Sidebar = () => import('@/components/common/Sidebar')

const FinancialReportPage = () => import('@/components/financialReport/index')

let routes = [
  {
    path: '/financial_report',
    name: 'financialReport',
    components: {
      default: FinancialReportPage,
      header: Header,
      sidebar: Sidebar
    },
    meta: { title: '上市公司财报', sidebarSelected: '1-4' }
  }
];

export default routes;
