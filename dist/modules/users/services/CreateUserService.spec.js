"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeHashProvider = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeHashProvider;
let createUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeHashProvider = new _FakeHashProvider.default();
    createUserService = new _CreateUserService.default(fakeUsersRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create user if your email already exists', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example'
    });
    expect(createUserService.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password_example'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});