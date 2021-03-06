import { Response} from 'express';
import { Request, CrudController } from './CrudController';

interface User{
    email:string,
    email_verified:boolean,
    name: string, //full name seperated by spaces
    avatar_url: string,
    sub_id:string,
    lang: 'en' // default to english
}

//WRITEME: implement UserController
export class UserController extends CrudController {
    
    public create(req: Request, res: Response): void {
        //require it to be authorized but not have an account
        throw new Error("Method not implemented.");
    }

    public read(req: Request, res: Response): void {
        //require auth and account
        throw new Error("Method not implemented.");
    }

    public update(req: Request, res: Response): void {
        //require auth and account
        throw new Error("Method not implemented.");
    }

    public delete(req: Request, res: Response): void {
        //require it to be authorized and have an account
        throw new Error("Method not implemented.");
    }
}