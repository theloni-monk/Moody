import { Response } from 'express';
import { Request, CrudController } from './CrudController';

//uid passed in req params
//WRITEME: implement MoodConfigController - for inputCards
export class MoodConfigController extends CrudController {
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

    public delete(req: Request, res: Response): void {
        throw new Error("Method not implemented.");
    }
}