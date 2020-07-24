import express, {  Response } from 'express';
import { Request, moodConfigController } from '../controllers';

export const router = express.Router({
    strict: true
});

//FIXME: check session for auth signing
router.post('/', (req: any, res: Response) => {
    moodConfigController.create(req, res);
});

router.get('/', (req: any, res: Response) => {
    moodConfigController.read(req, res);
});

router.patch('/', (req: any, res: Response) => {
    moodConfigController.update(req, res);
});

router.delete('/', (req: any, res: Response) => {
    moodConfigController.delete(req, res);
});
