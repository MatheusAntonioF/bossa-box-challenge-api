"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ToolsController = _interopRequireDefault(require("../controllers/ToolsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const toolsRouter = (0, _express.Router)();
const toolsController = new _ToolsController.default();
toolsRouter.get('/', toolsController.list);
toolsRouter.get('/:tag', toolsController.show);
toolsRouter.post('/', toolsController.create);
toolsRouter.delete('/:id', toolsController.delete);
var _default = toolsRouter;
exports.default = _default;