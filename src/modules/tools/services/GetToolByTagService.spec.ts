import AppError from '@shared/errors/AppError';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import CreateToolService from './CreateToolService';
import GetToolByTagService from './GetToolByTagService';

let fakeToolsRepository: FakeToolsRepository;
let fakeTagsRepository: FakeTagsRepository;
let createToolService: CreateToolService;
let getToolByTagService: GetToolByTagService;

describe('GetToolByTag', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    fakeTagsRepository = new FakeTagsRepository();

    createToolService = new CreateToolService(
      fakeToolsRepository,
      fakeTagsRepository
    );

    getToolByTagService = new GetToolByTagService(
      fakeToolsRepository,
      fakeTagsRepository
    );
  });

  it('should be able to filter tools by tag', async () => {
    const tagName = 'A new Tag';

    fakeTagsRepository.create(tagName);

    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    const tagNameToBeFiltering = 'Another new Tag';

    fakeTagsRepository.create(tagNameToBeFiltering);

    await createToolService.execute({
      title: 'Another Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagNameToBeFiltering],
    });

    const filtedToolsByTag = await getToolByTagService.execute({
      tagName: tagNameToBeFiltering,
    });

    expect(filtedToolsByTag).toHaveLength(1);
  });

  it('should not be able to filter by tag if that non existing', async () => {
    expect(
      getToolByTagService.execute({
        tagName: 'tag-name-non-existing',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
