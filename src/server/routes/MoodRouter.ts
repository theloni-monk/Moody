import express, { Request, Response } from 'express';
import { moodController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.post('/', (req: any, res: Response) => {
    moodController.create(req, res);
});

router.get('/', (req: any, res: Response) => {
    moodController.read(req, res);
});

router.patch('/', (req: any, res: Response) => {
    moodController.update(req, res);
});

router.delete('/', (req: any, res: Response) => {
    moodController.delete(req, res);
});

