import express, { Request, Response } from 'express';
import { moodController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.post('/', (req: Request, res: Response) => {
    moodController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
    moodController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
    moodController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
    moodController.delete(req, res);
});

