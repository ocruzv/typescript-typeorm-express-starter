import {
  Application as ExpressApp,
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';
import { flatMap } from 'lodash';
import AppRoutes from './v1/index';
import { checkJWT } from '../middleware/checkJWT';

export default class Routes {
  public router: Router = Router();

  public v1Routes(app: ExpressApp): void {
    app.use('/api/v1', this.router);

    flatMap(Object.entries(AppRoutes), routeBuilder => {
      const routeBasePath = routeBuilder[0];
      const routeData = routeBuilder[1];

      return routeData.map(route => ({
        ...route,
        path: `/${routeBasePath}${route.path}`,
      }));
    }).forEach(route => {
      const middlewares = [];

      if (route.requiresAuth) {
        middlewares.push(checkJWT);
      }

      this.router[route.method](route.path, middlewares, route.action);
    });
  }
}
