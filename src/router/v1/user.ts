import { Router, Request, Response } from 'express';

export default class UsersRoutes {
  public routes(router: Router): void {
    router.route('/user').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'GET request successfull',
      });
    });
  }
}
