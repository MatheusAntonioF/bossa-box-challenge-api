import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.router';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
