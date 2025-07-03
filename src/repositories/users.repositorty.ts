import {User} from "../models";

export interface IUsersRepository {
    saveUser (fullName : string, email : string, password : string, salt : string): Promise<any>;
    getUsers(): Promise<any>;
    getUserByEmail(email : string): Promise<any>;
    getUserByRefreshToken(refreshToken: string): Promise<any>;
    rotateRefreshToken(userId: string, oldRefreshToken: string, newRefreshToken: string): Promise<any>;
}

export class UserRepository implements IUsersRepository {  
    async saveUser(fullName : string, email : string, password : string, salt : string): Promise<any> {
        const user = {
            fullName,
            email,
            password,
            salt,
            refreshToken : null,
        }
        const newUser = new User(user)  ;
        return newUser.save();
    }

    async getUsers(): Promise<any> {
        return await User.find({$or : [{isDeleted : false}, {isDeleted : {$exists : false}}]});
    }

    async getUserByEmail(email : string): Promise<any> {
        return await User.findOne({email});
    }

    async getUserByRefreshToken(refreshToken: string): Promise<any> {
        return await User.findOne({refreshToken});
    }

    async rotateRefreshToken(userId: string, oldRefreshToken: string, newRefreshToken: string): Promise<any> {
        return await User.updateOne(
            { _id: userId, refreshToken: oldRefreshToken }, 
            { $set: { refreshToken: newRefreshToken } }
        );
    }
}