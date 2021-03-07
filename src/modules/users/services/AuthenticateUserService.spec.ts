import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example',
    });

    const response = await authenticateUserService.execute({
      email: 'john@example.com',
      password: 'password_example',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    expect(
      authenticateUserService.execute({
        email: 'non-existing-email@example.com',
        password: 'non-existing-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a user if your email or password is wrong', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example',
    });

    expect(
      authenticateUserService.execute({
        email: 'john@example.com',
        password: 'password_wrong',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
