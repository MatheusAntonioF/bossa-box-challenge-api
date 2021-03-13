"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeTagsRepository = _interopRequireDefault(require("../repositories/fakes/FakeTagsRepository"));

var _FakeToolsRepository = _interopRequireDefault(require("../repositories/fakes/FakeToolsRepository"));

var _CreateToolService = _interopRequireDefault(require("./CreateToolService"));

var _DeleteToolService = _interopRequireDefault(require("./DeleteToolService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeToolsRepository;
let fakeTagsRepository;
let createToolService;
let deleteToolService;
describe('DeleteTool', () => {
  beforeEach(() => {
    fakeToolsRepository = new _FakeToolsRepository.default();
    fakeTagsRepository = new _FakeTagsRepository.default();
    createToolService = new _CreateToolService.default(fakeToolsRepository, fakeTagsRepository);
    deleteToolService = new _DeleteToolService.default(fakeToolsRepository);
  });
  it('should be able to delete a tool', async () => {
    const tagName = 'A new Tag';
    fakeTagsRepository.create(tagName);
    const {
      id: deletedToolId
    } = await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    const hasDeletedTool = await deleteToolService.execute(deletedToolId);
    expect(hasDeletedTool).toBeTruthy();
  });
  it('should not be able to delete a tool if then does not existing', async () => {
    expect(deleteToolService.execute('nonexistent-id')).rejects.toBeInstanceOf(_AppError.default);
  });
});