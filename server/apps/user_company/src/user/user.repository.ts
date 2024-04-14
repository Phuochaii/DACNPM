import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
}