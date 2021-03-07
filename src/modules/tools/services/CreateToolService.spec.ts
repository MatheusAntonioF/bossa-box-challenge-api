import AppError from '@shared/errors/AppError';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import CreateToolService from './CreateToolService';

let fakeToolsRepository: FakeToolsRepository;
let fakeTagsRepository: FakeTagsRepository;
let createToolService: CreateToolService;

describe('CreateToolService', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    fakeTagsRepository = new FakeTagsRepository();

    createToolService = new CreateToolService(
      fakeToolsRepository,
      fakeTagsRepository
    );
  });

  it('should be able to create a tool', async () => {
    const tagName = 'A new Tag';

    fakeTagsRepository.create(tagName);

    const createdTool = await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    expect(createdTool).toHaveProperty('id');
  });

  it('should not be able to create a new tool if then already existing', async () => {
    const tagName = 'A new Tag';

    await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    expect(
      createToolService.execute({
        title: 'New Tool',
        description: 'A Description',
        link: 'a link',
        tags: [tagName],
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
