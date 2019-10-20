import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';

import User from '../entity/User';
import config from '../config/config';

export default class AuthController {
  public async logIn(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    const userRepository: Repository<User> = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    res.status(200).json({
      data: user,
      token,
    });
  }

  public async changePassword(req: Request, res: Response) {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    const userRepository: Repository<User> = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(200).json({
      message: 'Password updated successfully',
    });
  }
}
