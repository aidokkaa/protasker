import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { pool } from './db';
import multer from 'multer';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRouter from './routes/auth';
import usersRouter from './routes/users'
import taskRoutes from './routes/tasks';
import filterRoutes from './routes/filterRoutes';
import assignRouter from './routes/assigntasks';
import employyetaskRouter from './routes/getEmployyeAssignedTasks'
import cors from 'cors';
import commentRoures from './routes/commentRoutes';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],              
  allowedHeaders: ['Content-Type','Authorization'], 
  credentials: true,
}));

const PORT = process.env.PORT || 5000;

pool.connect()
  .then(client => {
    console.log('Подключение к базе данных PostgreSQL успешно!');
    client.release();
  })
  .catch(err => {
    console.error('Ошибка подключения к базе данных:', err);
  });

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/tasks', taskRoutes);
app.use('/api/filterprojects', filterRoutes);
app.use('/api/assigns', assignRouter);
app.use('/api/employyetasks',employyetaskRouter)
app.use('/api/taskComments', commentRoures);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, 'file-' + uniqueSuffix);  
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req: Request, res: Response): void => {
  const uploadedFile = req.file;
  const { taskId } = req.body;

  if (!uploadedFile || !taskId) {
    res.status(400).json({ error: 'No file uploaded or missing taskId' }); 
    return;
  }

  const photoPath = `/uploads/${uploadedFile.filename}`;


  pool.query(
    'UPDATE tasks SET photo_url = $1 WHERE id = $2 RETURNING photo_url',
    [photoPath, taskId],
    (err, result) => {
      if (err) {
        console.error('Error saving file info to database:', err);
        res.status(500).json({ error: 'Error saving file info to database' }); 
        return;
      }

      if (result.rowCount === 0) {
        res.status(404).json({ error: 'Task not found' }); 
        return;
      }

      res.status(200).json({
        message: 'File uploaded successfully',
        file: { path: photoPath },
      });
    }
  );
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

