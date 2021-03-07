import { uuid } from 'uuidv4';

import ICreateTool from '@modules/tools/dtos/ICreateTool';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';

import Tool from '@modules/tools/infra/typeorm/entities/Tool';

class FakeToolsRepository implements IToolsRepository {
  private tools: Tool[] = [];

  async findAll(): Promise<Tool[]> {
    const findedTools = this.tools;

    return findedTools;
  }

  async findById(id: string): Promise<Tool> {
    const findedTool = this.tools.find(tool => tool.id === id);

    return findedTool;
  }

  async findByTagId(id: string): Promise<Tool[]> {
    const findedToolsByTag = this.tools.find(tool =>
      tool.tags.find(tag => tag.id === id)
    );

    return [findedToolsByTag];
  }

  async findByTitle(title: string): Promise<Tool | null> {
    const findedTool = this.tools.find(tool => tool.title === title);

    return findedTool;
  }

  async create(tool: ICreateTool): Promise<Tool> {
    const newTool = new Tool();

    Object.assign(newTool, { id: uuid() }, tool);

    this.tools.push(newTool);

    return newTool;
  }

  async save(tool: Tool): Promise<Tool> {
    this.tools.push(tool);

    return tool;
  }

  async deleteById(id: string): Promise<boolean> {
    this.tools.filter(tool => tool.id !== id);

    return true;
  }
}

export default FakeToolsRepository;
