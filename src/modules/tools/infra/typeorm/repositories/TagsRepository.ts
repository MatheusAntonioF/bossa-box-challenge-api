import { getRepository, In, Repository } from 'typeorm';

import ITagsRepository from '@modules/tools/repositories/ITagsRepository';

import Tag from '../entities/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  async findByNames(nameTags: string[]): Promise<Tag[]> {
    const findedTags = await this.ormRepository.find({
      where: {
        name: In(nameTags),
      },
    });

    return findedTags;
  }

  create(tagName: string): Tag {
    const createdTag = this.ormRepository.create({ name: tagName });

    return createdTag;
  }

  async save(tags: Tag[]): Promise<Tag[]> {
    const savedTags = await this.ormRepository.save(tags);

    return savedTags;
  }
}

export default TagsRepository;
