import { getRepository, Repository } from 'typeorm';

import ICreateTool from '@modules/tools/dtos/ICreateTool';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import Tool from '../entities/Tool';

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  async findAll(): Promise<Tool[]> {
    const findedTools = await this.ormRepository.find();

    return findedTools;
  }

  async findByTitle(title: string): Promise<Tool | null> {
    const findedTool = await this.ormRepository.findOne({
      where: { title },
    });

    return findedTool;
  }

  async create(tool: ICreateTool): Promise<Tool> {
    const createdTool = this.ormRepository.create(tool);

    await this.ormRepository.save(createdTool);

    return createdTool;
  }

  async save(tool: Tool): Promise<Tool> {
    await this.ormRepository.save(tool);

    return tool;
  }
}

export default ToolsRepository;
