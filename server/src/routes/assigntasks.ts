import express,{Request,Response} from 'express';
import { getAssignedTasks } from '../controllers/tasks';
const router = express.Router();

router.get('/',getAssignedTasks);




export default router;