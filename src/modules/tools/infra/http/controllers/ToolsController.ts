import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToolService from '@modules/tools/services/CreateToolService';
import ListAllToolsService from '@modules/tools/services/ListAllToolsService';
import GetToolByTagService from '@modules/tools/services/GetToolByTagService';

class ToolsController {
  async list(_: Request, response: Response): Promise<Response> {
    const findedTools = await container.resolve(ListAllToolsService).execute();

    return response.json(findedTools);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { tag } = request.params;

    const findedTool = await container
      .resolve(GetToolByTagService)
      .execute({ tagName: tag });

    return response.json(findedTool);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;

    const createdTool = await container
      .resolve(CreateToolService)
      .execute({ title, link, description, tags });

    return response.json(createdTool);
  }
}

export default ToolsController;
