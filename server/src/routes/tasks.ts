import express,{Request,Response} from 'express';
import { createTask,getTask,fetchTasks,modifyTask,getTaskForUser, updateTaskStatusController } from '../controllers/tasks';
import { assignTaskToUser,deleteTask } from '../controllers/tasks';
import { verifyAdminRole, verifyManagerRole, verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();
router.post('/', verifyToken, verifyManagerRole,(req:Request,res:Response)=>{
  createTask(req,res)
});
router.get('/:id',(req:Request,res:Response)=>{
    getTask(req,res)
  });
  router.get('/', fetchTasks);

  router.put('/:id', verifyToken, verifyManagerRole, verifyAdminRole, (req: Request, res: Response) => {
    modifyTask(req, res);  
  });

  router.put("/:id/status", (req, res) => updateTaskStatusController(req, res));
  
    router.post('/assign-task', verifyToken, verifyManagerRole, (req: Request, res: Response) => {
      assignTaskToUser(req, res);
    });
    
    router.get('/assign-task/:userId',  verifyToken, async (req:Request, res: Response) => {
    getTaskForUser(req,res)
    });
    router.delete("/:taskId", deleteTask);
  
export default router;