"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IToolsRepository = _interopRequireDefault(require("../repositories/IToolsRepository"));

var _ITagsRepository = _interopRequireDefault(require("../repositories/ITagsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateToolService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ToolsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('TagsRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IToolsRepository.default === "undefined" ? Object : _IToolsRepository.default, typeof _ITagsRepository.default === "undefined" ? Object : _ITagsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateToolService {
  constructor(toolsRepository, tagsRepository) {
    this.toolsRepository = toolsRepository;
    this.tagsRepository = tagsRepository;
  }

  async execute({
    title,
    link,
    description,
    tags
  }) {
    const checkToolExists = await this.toolsRepository.findByTitle(title);
    if (checkToolExists) throw new _AppError.default('Tool already exists');
    const existingTags = await this.tagsRepository.findByNames(tags);
    const existingsTagNames = existingTags.map(({
      name
    }) => name);
    const tagNamesToBeCreate = tags.filter(tagName => {
      if (existingsTagNames.includes(tagName)) return null;
      return tagName;
    });
    let newTags = [];
    tagNamesToBeCreate.map(tagName => {
      const createdTag = this.tagsRepository.create(tagName);
      return newTags.push(createdTag);
    });
    const tagsThatWillBeCreate = [...existingTags, ...newTags];
    const createdTool = await this.toolsRepository.create({
      title,
      link,
      description,
      tags: tagsThatWillBeCreate
    });
    return createdTool;
  }

}) || _class) || _class) || _class) || _class) || _class);
var _default = CreateToolService;
exports.default = _default;