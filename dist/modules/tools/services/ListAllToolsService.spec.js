"use strict";

var _FakeTagsRepository = _interopRequireDefault(require("../repositories/fakes/FakeTagsRepository"));

var _FakeToolsRepository = _interopRequireDefault(require("../repositories/fakes/FakeToolsRepository"));

var _CreateToolService = _interopRequireDefault(require("./CreateToolService"));

var _ListAllToolsService = _interopRequireDefault(require("./ListAllToolsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeToolsRepository;
let fakeTagsRepository;
let createToolService;
let listAllToolsService;
describe('ListAllTools', () => {
  beforeEach(() => {
    fakeToolsRepository = new _FakeToolsRepository.default();
    fakeTagsRepository = new _FakeTagsRepository.default();
    createToolService = new _CreateToolService.default(fakeToolsRepository, fakeTagsRepository);
    listAllToolsService = new _ListAllToolsService.default(fakeToolsRepository);
  });
  it('should be able to list all tools', async () => {
    const tagName = 'A new Tag';
    fakeTagsRepository.create(tagName);
    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    await createToolService.execute({
      title: 'Another Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    const listedTools = await listAllToolsService.execute();
    expect(listedTools).toHaveLength(2);
  });
});