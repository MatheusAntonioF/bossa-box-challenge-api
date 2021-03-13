"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _jsonwebtoken = require("jsonwebtoken");

var _jwt = _interopRequireDefault(require("../../../../../config/jwt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ensureAuthenticated(request, response, next) {
  const {
    authorization: authHeader
  } = request.headers;
  if (!authHeader) throw new _AppError.default('JWT token is missing', 401);
  const [, token] = authHeader.split(' ');

  try {
    const {
      secret
    } = _jwt.default.jwt;
    const decoded = (0, _jsonwebtoken.verify)(token, secret);
    const {
      sub
    } = decoded;
    request.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.default('Invalid JWT token', 401);
  }
}

var _default = ensureAuthenticated;
exports.default = _default;