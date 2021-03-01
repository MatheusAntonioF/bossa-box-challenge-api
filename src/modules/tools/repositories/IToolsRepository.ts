import ICreateTool from '../dtos/ICreateTool';
import Tool from '../infra/typeorm/entities/Tool';

export default interface IToolsRepository {
  findByTitle(title: string): Promise<Tool | null>;
  create(data: ICreateTool): Promise<Tool>;
  save(tool: Tool): Promise<Tool>;
}
