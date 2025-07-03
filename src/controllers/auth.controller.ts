import { NextFunction, Request, Response } from "express";
import { IUsersService } from "../services/users.service";
import { generatePassword, verifyPassword, generateToken, generateRefreshToken, verifyRefreshToken } from "../utils/encryption";
import jwt from "jsonwebtoken";



interface IAuthController{
    register(req: Request, res: Response, next: NextFunction): Promise<any>;
    login(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export class AuthController implements IAuthController{
    constructor(private readonly userService: IUsersService){}

    async register(req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const {fullName, email, password} = req.body;
            const {salt, hash} = generatePassword(password);
            const user = await this.userService.saveUser(fullName, email, hash, salt);
            res.status(201).json(user);
        }catch(err){
            next(err);
        }
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<any> {
        try{
            const {email, password} = req.body;
            const user = await this.userService.getUserByEmail(email);
            if(!user){
                return res.status(401).json({message : "User not found"});
            }
            console.log({password}, {hash : user.password}, {salt : user.salt});
            try{
                const isPasswordValid = verifyPassword(password, user.password, user.salt);
                
                if(!isPasswordValid){
                    return res.status(401).json({message : "Invalid password"});
                }
            }catch(err){
                return res.status(500).json({message : "Something went wrong"});
            }
            const tokenPayload = {
                userid : user._id,
                email : user.email,
                name : user.name,
            }
            const token = generateToken(tokenPayload);
            const refreshToken = generateRefreshToken(tokenPayload);
            res.status(200).json({token, refreshToken, ...user.toJSON()});
        }catch(err){
            next(err);
        }
    }

    async refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const {refreshToken} = req.body;
            const decoded = verifyRefreshToken(refreshToken) as any;
            
            const user = await this.userService.getUserByRefreshToken(refreshToken);
            if (!user) {
                throw new Error("Invalid refresh token");
            }

            if (decoded.userId !== user._id.toString()) {
                throw new Error("Token mismatch");
            }

            const tokenPayload = {
                userId: user._id,
                email: user.email,
                fullName: user.fullName
            };
            const newAccessToken = generateToken(tokenPayload);
            const newRefreshToken = generateRefreshToken(tokenPayload);

            const updateResult = await this.userService.rotateRefreshToken(user._id, refreshToken, newRefreshToken);
            
            if (updateResult.modifiedCount === 0) {
                throw new Error("Token rotation failed");
            }

            const { password, salt, refreshTokens, ...userData } = user;
            return res.status(200).json({
                message: "Token refreshed successfully",
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                user: userData
            });
        } catch (error) {
            return res.status(401).json({ error: "Invalid refresh token" });
        }
    }
}