import Tag from '../infra/typeorm/entities/Tag';

export default interface ITagsRepository {
  findByName(name: string): Promise<Tag | null>;
  findByNames(tagNames: string[]): Promise<Tag[]>;
  create(tagName: string): Tag;
  save(tags: Tag[]): Promise<Tag[]>;
}
