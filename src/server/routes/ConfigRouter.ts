import express, {  Response } from 'express';
import { Request, moodConfigController } from '../controllers';

export const router = express.Router({
    strict: true
});

//FIXME: check session for auth signing
router.post('/', (req: Request, res: Response) => {
    moodConfigController.create(req, res);
});

router.get('/', (req: Request, res: Response) => {
    moodConfigController.read(req, res);
});

router.patch('/', (req: Request, res: Response) => {
    moodConfigController.update(req, res);
});

router.delete('/', (req: Request, res: Response) => {
    moodConfigController.delete(req, res);
});
