import { Request, Response } from 'express';
import { filterProjects} from '../services/filterServices';
export const getProjectsFilter = async (req: Request, res: Response) => {
    const filters = {
      status: req.query.status as string,
      user_id: req.query.user_id ? Number(req.query.user_id) : undefined, 
    start_date:req.query.start_date as string 
    };
    try {
      const projects = await filterProjects(filters);
      res.status(200).json(projects);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch projects' });
    }
  };


