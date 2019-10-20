import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import Routes from './router/index';

class App {
  public app: express.Application;
  public routes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();

    this.routes.v1Routes(this.app);
  }

  private config(): void {
    // support application/json type post data
    this.app.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
