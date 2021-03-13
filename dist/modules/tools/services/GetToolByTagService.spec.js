"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeTagsRepository = _interopRequireDefault(require("../repositories/fakes/FakeTagsRepository"));

var _FakeToolsRepository = _interopRequireDefault(require("../repositories/fakes/FakeToolsRepository"));

var _CreateToolService = _interopRequireDefault(require("./CreateToolService"));

var _GetToolByTagService = _interopRequireDefault(require("./GetToolByTagService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeToolsRepository;
let fakeTagsRepository;
let createToolService;
let getToolByTagService;
describe('GetToolByTag', () => {
  beforeEach(() => {
    fakeToolsRepository = new _FakeToolsRepository.default();
    fakeTagsRepository = new _FakeTagsRepository.default();
    createToolService = new _CreateToolService.default(fakeToolsRepository, fakeTagsRepository);
    getToolByTagService = new _GetToolByTagService.default(fakeToolsRepository, fakeTagsRepository);
  });
  it('should be able to filter tools by tag', async () => {
    const tagName = 'A new Tag';
    fakeTagsRepository.create(tagName);
    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName]
    });
    const tagNameToBeFiltering = 'Another new Tag';
    fakeTagsRepository.create(tagNameToBeFiltering);
    await createToolService.execute({
      title: 'Another Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagNameToBeFiltering]
    });
    const filtedToolsByTag = await getToolByTagService.execute({
      tagName: tagNameToBeFiltering
    });
    expect(filtedToolsByTag).toHaveLength(1);
  });
  it('should not be able to filter by tag if that non existing', async () => {
    expect(getToolByTagService.execute({
      tagName: 'tag-name-non-existing'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});