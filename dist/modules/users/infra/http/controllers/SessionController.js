"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AuthenticateUserService = _interopRequireDefault(require("../../../services/AuthenticateUserService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SessionController {
  async create(request, response) {
    const {
      email,
      password
    } = request.body;
    const {
      user,
      token
    } = await _tsyringe.container.resolve(_AuthenticateUserService.default).execute({
      email,
      password
    });
    delete user.password;
    return response.json({
      user,
      token
    });
  }

}

var _default = SessionController;
exports.default = _default;