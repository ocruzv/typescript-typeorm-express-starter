import {
  MigrationInterface,
  QueryRunner,
  getRepository,
  Repository,
} from 'typeorm';
import User from '../entity/User';

export class CreateAdminUser1571606882700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const user = new User();
    user.email = 'admin@myemail.com';
    user.password = 'admin';
    user.hashPassword();
    user.role = 'ADMIN';
    const userRepository: Repository<User> = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
