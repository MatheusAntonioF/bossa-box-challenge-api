"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _ToolsRepository = _interopRequireDefault(require("../../modules/tools/infra/typeorm/repositories/ToolsRepository"));

var _TagsRepository = _interopRequireDefault(require("../../modules/tools/infra/typeorm/repositories/TagsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('ToolsRepository', _ToolsRepository.default);

_tsyringe.container.registerSingleton('TagsRepository', _TagsRepository.default);