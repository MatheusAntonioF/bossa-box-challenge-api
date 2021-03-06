import { Router } from 'express';
import ToolsController from '../controllers/ToolsController';

const toolsRouter = Router();

const toolsController = new ToolsController();

toolsRouter.get('/', toolsController.list);
toolsRouter.get('/:tag', toolsController.show);
toolsRouter.post('/', toolsController.create);

export default toolsRouter;
