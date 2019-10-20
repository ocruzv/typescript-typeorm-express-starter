import { Application as ExpressApp, Router } from 'express';
import { flatMap } from 'lodash';
import AppRoutes from './v1/index';

export default class Routes {
  public router: Router = Router();

  public v1Routes(app: ExpressApp): void {
    app.use('/api/v1', this.router);

    flatMap(Object.entries(AppRoutes), routeBuilder => {
      const routeBasePath = routeBuilder[0];
      const routeData = routeBuilder[1];

      return routeData.map(route => ({
        method: route.method,
        path: `/${routeBasePath}${route.path}`,
        action: route.action,
      }));
    }).forEach(route => {
      this.router[route.method](route.path, route.action);
    });
  }
}
