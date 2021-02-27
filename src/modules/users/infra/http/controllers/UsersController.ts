import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createdUser = await container
      .resolve(CreateUserService)
      .execute({ name, email, password });

    delete createdUser.password;

    return response.json(createdUser);
  }
}

export default UsersController;
