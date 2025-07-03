import { NextFunction, Request, Response } from "express";
import { IUsersService } from "../services/users.service";

export interface IUserController{
    getUsers(req: Request, res: Response, next : NextFunction): Promise<any>;
    getUserByEmail(req: Request, res: Response, next : NextFunction): Promise<any>;
}

export class UserController implements IUserController{
    constructor(private readonly usersService: IUsersService){
       
    }



    async getUsers(req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const users = await this.usersService.getUsers();
            res.status(200).json(users);
        }catch(err){
            next(err);
        }
    }

    async getUserByEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const {email} = req.params;
            const user = await this.usersService.getUserByEmail(email);
            res.status(200).json(user);
        }catch(err){
            next(err);
        }
    }
}