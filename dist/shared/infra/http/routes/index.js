"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _session = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/session.router"));

var _tools = _interopRequireDefault(require("../../../../modules/tools/infra/http/routes/tools.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/users', _users.default);
routes.use('/session', _session.default);
routes.use('/tools', _tools.default);
var _default = routes;
exports.default = _default;