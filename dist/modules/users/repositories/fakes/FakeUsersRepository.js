"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeUsersRepository {
  constructor() {
    this.users = [];
  }

  async findByEmail(email) {
    const findedUser = this.users.find(user => user.email === email);
    return findedUser;
  }

  async create(userData) {
    const newUser = new _User.default();
    Object.assign(newUser, {
      id: (0, _uuidv.uuid)()
    }, userData);
    this.users.push(newUser);
    return newUser;
  }

  async save(user) {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

}

var _default = FakeUsersRepository;
exports.default = _default;