import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { userController } from './controller';
const router: Router = Router();
router.post('/' ,userController.create);
router.post('/login' ,userController.login);
router.post('/refresh' ,[auth.validateTokenRefresh],userController.refresh);
export default router;