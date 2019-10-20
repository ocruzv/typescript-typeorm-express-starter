import { Application as ExpressApp, Router } from 'express';
import UsersRoutes from './v1/user';

export default class Routes {
  public router: Router = Router();
  public usersRoutes: UsersRoutes = new UsersRoutes();

  public v1Routes(app: ExpressApp): void {
    app.use('/api/v1', this.router);
    this.usersRoutes.routes(this.router);
  }
}
