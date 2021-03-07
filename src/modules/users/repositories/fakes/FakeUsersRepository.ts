import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const findedUser = this.users.find(user => user.email === email);

    return findedUser;
  }

  async create(userData: User): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, { id: uuid() }, userData);

    this.users.push(newUser);

    return newUser;
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
