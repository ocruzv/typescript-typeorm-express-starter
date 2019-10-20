import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { validate } from 'class-validator';
import User from '../entity/User';

export default class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const users = await userRepository.find({
        select: ['id', 'email', 'role'],
      });
      return res.status(200).json({
        data: users,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const user = await userRepository.findOneOrFail(req.params.id, {
        select: ['id', 'email', 'role'],
      });

      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);

      const user = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      user.role = req.body.role;

      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }

      user.hashPassword();

      await userRepository.save(user);

      return res.status(200).json({
        data: user,
        message: 'User saved successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      let user = await userRepository.findOneOrFail(req.params.id);
      let dataToUpdate = {
        ...req.body,
      };

      delete dataToUpdate.password;
      delete dataToUpdate.id;
      delete dataToUpdate.email;

      user = {
        ...user,
        ...dataToUpdate,
      };

      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }

      await userRepository.save(user);

      return res.status(200).send({
        data: user,
        message: 'User updated successfully',
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const user = await userRepository.findOneOrFail(req.params.id);
      await userRepository.remove(user);

      return res.status(200).json({
        data: user,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
