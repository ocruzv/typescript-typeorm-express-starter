import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import User from '../entity/User';

export default class UserController {
  public async getAll(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const users = await userRepository.find();
      return res.status(200).send({
        data: users,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async getOne(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const user = await userRepository.findOne(req.params.id);

      if (user) {
        return res.status(200).send({
          data: user,
        });
      }

      return res.status(200).send({
        message: 'User not found',
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);

      const user = new User();
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.age = req.body.age;

      await userRepository.save(user);

      return res.status(200).send({
        data: user,
        message: 'User saved successfully',
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      let user = await userRepository.findOne(req.params.id);

      if (user) {
        user = {
          ...user,
          ...req.body,
        };

        await userRepository.save(user);

        return res.status(200).send({
          data: user,
          message: 'User updated successfully',
        });
      }

      return res.status(200).send({
        message: 'User not found',
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  public async remove(req: Request, res: Response) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      const user = await userRepository.findOne(req.params.id);
      await userRepository.remove(user);

      return res.status(200).send({
        data: user,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
