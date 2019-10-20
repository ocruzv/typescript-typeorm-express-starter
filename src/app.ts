import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';

import Routes from './router/index';

export default class App {
  public defaultApp: express.Application;
  public routes: Routes = new Routes();

  public initialize(): void {
    this.defaultApp = express();
    this.config();
    this.setRouter();
  }

  private config(): void {
    // support application/json type post data
    this.defaultApp.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
    this.defaultApp.use(bodyParser.urlencoded({ extended: false }));
    this.defaultApp.use(cors());
    this.defaultApp.use(helmet());
  }

  private setRouter(): void {
    this.routes.v1Routes(this.defaultApp);
  }
}
