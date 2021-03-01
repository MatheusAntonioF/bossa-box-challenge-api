import { inject, injectable } from 'tsyringe';

import IToolsRepository from '../repositories/IToolsRepository';
import Tool from '../infra/typeorm/entities/Tool';

@injectable()
class ListAllToolsService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  async execute(): Promise<Tool[]> {
    const findedTools = await this.toolsRepository.findAll();

    return findedTools;
  }
}

export default ListAllToolsService;
