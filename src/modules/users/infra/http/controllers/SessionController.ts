import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await container
      .resolve(AuthenticateUserService)
      .execute({ email, password });

    delete user.password;

    return response.json({ user, token });
  }
}

export default SessionController;