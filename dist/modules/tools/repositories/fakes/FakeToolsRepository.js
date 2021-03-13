"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _Tool = _interopRequireDefault(require("../../infra/typeorm/entities/Tool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeToolsRepository {
  constructor() {
    this.tools = [];
  }

  async findAll() {
    const findedTools = this.tools;
    return findedTools;
  }

  async findById(id) {
    const findedTool = this.tools.find(tool => tool.id === id);
    return findedTool;
  }

  async findByTagId(id) {
    const findedToolsByTag = this.tools.find(tool => tool.tags.find(tag => tag.id === id));
    return [findedToolsByTag];
  }

  async findByTitle(title) {
    const findedTool = this.tools.find(tool => tool.title === title);
    return findedTool;
  }

  async create(tool) {
    const newTool = new _Tool.default();
    Object.assign(newTool, {
      id: (0, _uuidv.uuid)()
    }, tool);
    this.tools.push(newTool);
    return newTool;
  }

  async save(tool) {
    this.tools.push(tool);
    return tool;
  }

  async deleteById(id) {
    this.tools.filter(tool => tool.id !== id);
    return true;
  }

}

var _default = FakeToolsRepository;
exports.default = _default;