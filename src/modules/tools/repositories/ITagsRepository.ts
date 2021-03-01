import Tag from '../infra/typeorm/entities/Tag';

export default interface ITagsRepository {
  findByNames(tags: string[]): Promise<Tag[]>;
  create(tagName: string): Tag;
  save(tags: Tag[]): Promise<Tag[]>;
}
