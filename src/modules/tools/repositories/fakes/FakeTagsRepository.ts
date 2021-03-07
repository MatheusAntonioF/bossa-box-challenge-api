import { uuid } from 'uuidv4';

import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';

class FakeTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  async findByName(name: string): Promise<Tag | null> {
    const findedTag = this.tags.find(tag => tag.name === name);

    return findedTag;
  }

  async findByNames(nameTags: string[]): Promise<Tag[]> {
    const findedTags: Tag[] = [];

    nameTags.forEach(tagNameToBeFind => {
      const findedTag = this.tags.find(tag => tag.name === tagNameToBeFind);

      if (findedTag) findedTags.push(findedTag);
    });

    return findedTags;
  }

  create(tagName: string): Tag {
    const newTag = new Tag();

    Object.assign(newTag, { id: uuid() }, { name: tagName });

    this.tags.push(newTag);

    return newTag;
  }

  async save(tags: Tag[]): Promise<Tag[]> {
    const savedTags = tags.map(tag => {
      this.tags.push(tag);

      return tag;
    });

    return savedTags;
  }
}

export default FakeTagsRepository;
