import { Router } from 'express';
import { getProjectsFilter } from '../controllers/filterControllers' // Импортируем контроллеры

const router = Router();
router.get('/', (req,res)=>{
getProjectsFilter(req,res)
});

export default router;