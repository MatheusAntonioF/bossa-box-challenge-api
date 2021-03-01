import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.router';
import toolsRouter from '@modules/tools/infra/http/routes/tools.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);
routes.use('/tools', toolsRouter);

export default routes;
