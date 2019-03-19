import VueRouter, { RouterOptions } from 'vue-router';
import { Vue } from 'vue-property-decorator';

import routes from './routes';

export const routerOptions = <RouterOptions>{
  routes,
  base: '/',
}

Vue.use(VueRouter);

let router:VueRouter = null;

const getRouter = () => {
  if (!router) {
    router = new VueRouter(routerOptions);
  }

  return router;
};

export default getRouter;
