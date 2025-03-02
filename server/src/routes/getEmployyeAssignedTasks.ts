import express,{Request,Response} from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authMiddleware';
import { getUserTasks } from '../controllers/tasks';

router.get('/', (req: Request, res: Response) => {
    console.log("Request query:", req.query); 
    verifyToken(req, res, () => {
      console.log('Token verified');
      getUserTasks(req, res);
    });
  });
  export default router;