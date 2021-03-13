"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeTagsRepository = _interopRequireDefault(require("../repositories/fakes/FakeTagsRepository"));

var _FakeToolsRepository = _interopRequireDefault(require("../repositories/fakes/FakeToolsRepository"));

var _CreateToolService = _interopRequireDefault(require("./CreateToolService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeToolsRepository;
let fakeTagsRepository;
let createToolService;
describe('CreateToolService', () => {
  beforeEach(() => {
    fakeToolsRepository = new _FakeToolsRepository.default();
    fakeTagsRepository = new _FakeTagsRepository.default();
    createToolService = new _CreateToolService.default(fakeToolsRepository, fakeTagsRepository);
  });
  it('should be able to create a tool', async () => {
    const tagName = 'A new Tag';
    fakeTagsRepository.create(tagName);
    const createdTool = await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    expect(createdTool).toHaveProperty('id');
  });
  it('should not be able to create a new tool if then already existing', async () => {
    const tagName = 'A new Tag';
    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    expect(createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});