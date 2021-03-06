import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import Tool from '../infra/typeorm/entities/Tool';
import ITagsRepository from '../repositories/ITagsRepository';
import IToolsRepository from '../repositories/IToolsRepository';

interface IRequest {
  tagName: string;
}

@injectable()
class GetToolByTagService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ tagName }: IRequest): Promise<Tool[]> {
    const findedTag = await this.tagsRepository.findByName(tagName);

    if (!findedTag) throw new AppError('This tag does not exist');

    const { id: tagId } = findedTag;

    const findedToolByTag = await this.toolsRepository.findByTagId(tagId);

    const tools: Tool[] = [];

    await Promise.all(
      findedToolByTag.map(async ({ id }) => {
        const findedTool = await this.toolsRepository.findById(id);

        tools.push(findedTool);
      })
    );

    return tools;
  }
}

export default GetToolByTagService;
