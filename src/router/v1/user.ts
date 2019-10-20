import UserController from '../../controller/user';

const userController = new UserController();

const UserRoutes = [
  {
    path: '/',
    method: 'get',
    action: userController.getAll,
  },
  {
    path: '/:id',
    method: 'get',
    action: userController.getOne,
  },
  {
    path: '/',
    method: 'post',
    action: userController.create,
  },
  {
    path: '/:id',
    method: 'put',
    action: userController.update,
  },
  {
    path: '/:id',
    method: 'delete',
    action: userController.remove,
  },
];

export default UserRoutes;
