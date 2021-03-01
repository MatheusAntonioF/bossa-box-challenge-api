import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IToolsRepository from '../repositories/IToolsRepository';
import ITagsRepository from '../repositories/ITagsRepository';

import Tool from '../infra/typeorm/entities/Tool';
import Tag from '../infra/typeorm/entities/Tag';

interface IRequestDTO {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({
    title,
    link,
    description,
    tags,
  }: IRequestDTO): Promise<Tool> {
    const checkToolExists = await this.toolsRepository.findByTitle(title);

    if (checkToolExists) throw new AppError('Tool already exists');

    const existingTags = await this.tagsRepository.findByNames(tags);

    const existingsTagNames = existingTags.map(({ name }) => name);

    const tagNamesToBeCreate = tags.filter(tagName => {
      if (existingsTagNames.includes(tagName)) return null;

      return tagName;
    });

    let newTags: Tag[] = [];

    tagNamesToBeCreate.map(tagName => {
      const createdTag = this.tagsRepository.create(tagName);

      return newTags.push(createdTag);
    });

    const tagsThatWillBeCreate = [...existingTags, ...newTags];

    const createdTool = await this.toolsRepository.create({
      title,
      link,
      description,
      tags: tagsThatWillBeCreate,
    });

    return createdTool;
  }
}

export default CreateToolService;
