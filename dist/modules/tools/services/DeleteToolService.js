"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _IToolsRepository = _interopRequireDefault(require("../repositories/IToolsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteToolService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ToolsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IToolsRepository.default === "undefined" ? Object : _IToolsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteToolService {
  constructor(toolsRepository) {
    this.toolsRepository = toolsRepository;
  }

  async execute(id) {
    const findedTool = await this.toolsRepository.findById(id);
    if (!findedTool) throw new _AppError.default('Tool does not found');
    const hasDeletedTool = await this.toolsRepository.deleteById(findedTool.id);
    return hasDeletedTool;
  }

}) || _class) || _class) || _class) || _class);
var _default = DeleteToolService;
exports.default = _default;