import { getRepository, Repository } from 'typeorm';

import ICreateTool from '@modules/tools/dtos/ICreateTool';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import Tool from '../entities/Tool';
import Tag from '../entities/Tag';

class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  private tagsRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tool);
    this.tagsRepository = getRepository(Tag);
  }

  async findAll(): Promise<Tool[]> {
    const findedTools = await this.ormRepository.find();

    return findedTools;
  }

  async findById(id: string): Promise<Tool> {
    const findedTool = await this.ormRepository.findOne(id);

    return findedTool;
  }

  async findByTagId(id: string): Promise<Tool[]> {
    const findedToolsByTag = await this.tagsRepository
      .createQueryBuilder()
      .relation(Tag, 'tool')
      .of({ id })
      .loadMany();

    return findedToolsByTag;
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
