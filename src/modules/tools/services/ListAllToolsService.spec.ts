import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import CreateToolService from './CreateToolService';
import ListAllToolsService from './ListAllToolsService';

let fakeToolsRepository: FakeToolsRepository;
let fakeTagsRepository: FakeTagsRepository;
let createToolService: CreateToolService;
let listAllToolsService: ListAllToolsService;

describe('ListAllTools', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    fakeTagsRepository = new FakeTagsRepository();

    createToolService = new CreateToolService(
      fakeToolsRepository,
      fakeTagsRepository
    );

    listAllToolsService = new ListAllToolsService(fakeToolsRepository);
  });

  it('should be able to list all tools', async () => {
    const tagName = 'A new Tag';

    fakeTagsRepository.create(tagName);

    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    await createToolService.execute({
      title: 'Another Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    const listedTools = await listAllToolsService.execute();

    expect(listedTools).toHaveLength(2);
  });
});
