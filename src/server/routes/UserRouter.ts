import express, { Request, Response } from 'express';
import { userController } from '../controllers';

export const router = express.Router({
    strict: true
});
//TODO: implement req parsing in router not controller
//TODO: implement seperate mood routing per user

//HACK: casting req to any to avoid diff method types for reqs with session data
router.post('/', (req: any, res: Response) => {
    userController.create(req, res);
});

router.get('/', (req: any, res: Response) => {
    userController.read(req, res);
});

router.patch('/', (req: any, res: Response) => {
    userController.update(req, res);
});

router.delete('/', (req: any, res: Response) => {
    userController.delete(req, res);
});
