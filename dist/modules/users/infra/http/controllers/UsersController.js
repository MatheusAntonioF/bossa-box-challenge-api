"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;
    const createdUser = await _tsyringe.container.resolve(_CreateUserService.default).execute({
      name,
      email,
      password
    });
    delete createdUser.password;
    return response.json(createdUser);
  }

}

var _default = UsersController;
exports.default = _default;