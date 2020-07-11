import { Response } from 'express';
export interface Request extends Express.Request {
    session: [any];
}
export abstract class CrudController {
    public abstract create(req: Request, res: Response): void;
    public abstract read(req: Request, res: Response): void;
    public abstract update(req: Request, res: Response): void;
    public abstract delete(req: Request, res: Response): void;
}