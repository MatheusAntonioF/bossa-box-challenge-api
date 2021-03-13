"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Tool = _interopRequireDefault(require("../entities/Tool"));

var _Tag = _interopRequireDefault(require("../entities/Tag"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ToolsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.tagsRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Tool.default);
    this.tagsRepository = (0, _typeorm.getRepository)(_Tag.default);
  }

  async findAll() {
    const findedTools = await this.ormRepository.find();
    return findedTools;
  }

  async findById(id) {
    const findedTool = await this.ormRepository.findOne(id);
    return findedTool;
  }

  async findByTagId(id) {
    const findedToolsByTag = await this.tagsRepository.createQueryBuilder().relation(_Tag.default, 'tool').of({
      id
    }).loadMany();
    return findedToolsByTag;
  }

  async findByTitle(title) {
    const findedTool = await this.ormRepository.findOne({
      where: {
        title
      }
    });
    return findedTool;
  }

  async create(tool) {
    const createdTool = this.ormRepository.create(tool);
    await this.ormRepository.save(createdTool);
    return createdTool;
  }

  async save(tool) {
    await this.ormRepository.save(tool);
    return tool;
  }

  async deleteById(id) {
    await this.ormRepository.delete({
      id
    });
    return true;
  }

}

var _default = ToolsRepository;
exports.default = _default;