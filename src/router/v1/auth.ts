import AuthController from '../../controller/AuthController';

const authController = new AuthController();

const AuthRoutes = [
  {
    path: '/login',
    method: 'post',
    action: authController.logIn,
  },
];

export default AuthRoutes;
