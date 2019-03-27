import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../../page/HomePage';
import CodePage from '../../page/CodePage';

const navRoutes = <Array<any>>[
  { name: 'home', path: '/', component: HomePage, props: true },
  { name: 'code', path: '/code', component: CodePage, props: true}
]

export default navRoutes
