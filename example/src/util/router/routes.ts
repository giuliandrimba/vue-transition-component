import VueRouter, { RouteConfig } from 'vue-router';
import HomePage from '../../page/HomePage';
import CodePage from '../../page/CodePage';

console.log(HomePage);

const navRoutes = <Array<RouteConfig>>[
  { name: 'home', path: '/', component: HomePage, props: true },
  { name: 'code', path: '/code', component: CodePage, props: true}
]

export default navRoutes
