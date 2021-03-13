"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ITagsRepository = _interopRequireDefault(require("../repositories/ITagsRepository"));

var _IToolsRepository = _interopRequireDefault(require("../repositories/IToolsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GetToolByTagService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ToolsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('TagsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IToolsRepository.default === "undefined" ? Object : _IToolsRepository.default, typeof _ITagsRepository.default === "undefined" ? Object : _ITagsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class GetToolByTagService {
  constructor(toolsRepository, tagsRepository) {
    this.toolsRepository = toolsRepository;
    this.tagsRepository = tagsRepository;
  }

  async execute({
    tagName
  }) {
    const findedTag = await this.tagsRepository.findByName(tagName);
    if (!findedTag) throw new _AppError.default('This tag does not exist');
    const {
      id: tagId
    } = findedTag;
    const findedToolByTag = await this.toolsRepository.findByTagId(tagId);
    const tools = [];
    await Promise.all(findedToolByTag.map(async ({
      id
    }) => {
      const findedTool = await this.toolsRepository.findById(id);
      tools.push(findedTool);
    }));
    return tools;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = GetToolByTagService;
exports.default = _default;