import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICreateUser from '../dtos/ICreateUser';
import User from '../infra/typeorm/entities/User';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (checkUsersExists) throw new AppError('Email address already ');

    const hashedPassword = await this.hashProvider.generateHash(
      String(password)
    );

    const createdUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return createdUser;
  }
}

export default CreateUserService;
