import CreateToolService from '@modules/tools/services/CreateToolService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ToolsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, link, description, tags } = request.body;

    const createdTool = await container
      .resolve(CreateToolService)
      .execute({ title, link, description, tags });

    return response.json(createdTool);
  }
}

export default ToolsController;
