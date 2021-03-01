import Tag from '../infra/typeorm/entities/Tag';

export default interface ICreateTool {
  title: string;
  link: string;
  description: string;
  tags: Tag[];
}
