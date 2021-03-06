import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create user if your email already exists', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example',
    });

    expect(
      createUserService.execute({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password_example',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
