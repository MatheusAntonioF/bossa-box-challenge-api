import AppError from '@shared/errors/AppError';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FakeToolsRepository from '../repositories/fakes/FakeToolsRepository';
import CreateToolService from './CreateToolService';
import DeleteToolService from './DeleteToolService';

let fakeToolsRepository: FakeToolsRepository;
let fakeTagsRepository: FakeTagsRepository;
let createToolService: CreateToolService;
let deleteToolService: DeleteToolService;

describe('DeleteTool', () => {
  beforeEach(() => {
    fakeToolsRepository = new FakeToolsRepository();
    fakeTagsRepository = new FakeTagsRepository();

    createToolService = new CreateToolService(
      fakeToolsRepository,
      fakeTagsRepository
    );

    deleteToolService = new DeleteToolService(fakeToolsRepository);
  });

  it('should be able to delete a tool', async () => {
    const tagName = 'A new Tag';

    fakeTagsRepository.create(tagName);

    const { id: deletedToolId } = await createToolService.execute({
      title: 'New Tool',
      description: 'A Description',
      link: 'a link',
      tags: [tagName],
    });

    const hasDeletedTool = await deleteToolService.execute(deletedToolId);

    expect(hasDeletedTool).toBeTruthy();
  });

  it('should not be able to delete a tool if then does not existing', async () => {
    expect(deleteToolService.execute('nonexistent-id')).rejects.toBeInstanceOf(
      AppError
    );
  });
});
