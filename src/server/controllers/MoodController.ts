import { Response } from 'express';
import { Request, CrudController } from './CrudController';

//uid passed in req params
//WRITEME: implement MoodController for mood data by date
export class MoodController extends CrudController {
    //req.session.uid = _id
    public create(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public read(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    public update(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }

    //Note: maybe dont implement
    public delete(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
}