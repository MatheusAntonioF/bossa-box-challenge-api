"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
let authenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
    authenticateUserService = new _AuthenticateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example'
    });
    const response = await authenticateUserService.execute({
      email: 'john@example.com',
      password: 'password_example'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    expect(authenticateUserService.execute({
      email: 'non-existing-email@example.com',
      password: 'non-existing-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to authenticate a user if your email or password is wrong', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example'
    });
    expect(authenticateUserService.execute({
      email: 'john@example.com',
      password: 'password_wrong'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});