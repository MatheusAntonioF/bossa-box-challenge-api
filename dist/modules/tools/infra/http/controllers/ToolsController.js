"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateToolService = _interopRequireDefault(require("../../../services/CreateToolService"));

var _ListAllToolsService = _interopRequireDefault(require("../../../services/ListAllToolsService"));

var _GetToolByTagService = _interopRequireDefault(require("../../../services/GetToolByTagService"));

var _DeleteToolService = _interopRequireDefault(require("../../../services/DeleteToolService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ToolsController {
  async list(_, response) {
    const findedTools = await _tsyringe.container.resolve(_ListAllToolsService.default).execute();
    return response.json(findedTools);
  }

  async show(request, response) {
    const {
      tag
    } = request.params;
    const findedTool = await _tsyringe.container.resolve(_GetToolByTagService.default).execute({
      tagName: tag
    });
    return response.json(findedTool);
  }

  async create(request, response) {
    const {
      title,
      link,
      description,
      tags
    } = request.body;
    const createdTool = await _tsyringe.container.resolve(_CreateToolService.default).execute({
      title,
      link,
      description,
      tags
    });
    return response.sendStatus(201).json(createdTool);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    await _tsyringe.container.resolve(_DeleteToolService.default).execute(id);
    return response.sendStatus(204);
  }

}

var _default = ToolsController;
exports.default = _default;