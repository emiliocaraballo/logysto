import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import { directionController } from './controller';
const router: Router = Router();
router.get('/search' ,[auth.validateToken],directionController.FindDirection);
export default router;