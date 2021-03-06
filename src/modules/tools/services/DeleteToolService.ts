import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IToolsRepository from '../repositories/IToolsRepository';

@injectable()
class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const findedTool = await this.toolsRepository.findById(id);

    if (!findedTool) throw new AppError('Tool does not found');

    const hasDeletedTool = await this.toolsRepository.deleteById(findedTool.id);

    return hasDeletedTool;
  }
}

export default DeleteToolService;
