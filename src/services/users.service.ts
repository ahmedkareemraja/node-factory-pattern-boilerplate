import { IUsersRepository } from "../repositories/users.repositorty";

export interface IUsersService{
    saveUser(fullName: string, email: string, password: string, salt: string): Promise<any>;
    getUsers(): Promise<any>;
    getUserByEmail(email: string): Promise<any>;
    getUserByRefreshToken(refreshToken: string): Promise<any>;
    rotateRefreshToken(userId: string, oldRefreshToken: string, newRefreshToken: string): Promise<any>;
}

export class UsersService implements IUsersService {
    constructor(private readonly userRepository: IUsersRepository) {}

    async saveUser(fullName: string, email: string, password: string, salt: string): Promise<any> {
        return this.userRepository.saveUser(fullName, email, password, salt);
    }

    async getUsers(): Promise<any> {
        return this.userRepository.getUsers();
    }

    async getUserByEmail(email: string): Promise<any> {
        return this.userRepository.getUserByEmail(email);
    }

    async getUserByRefreshToken(refreshToken: string): Promise<any> {
        return this.userRepository.getUserByRefreshToken(refreshToken);
    }

    async rotateRefreshToken(userId: string, oldRefreshToken: string, newRefreshToken: string): Promise<any> {
        return this.userRepository.rotateRefreshToken(userId, oldRefreshToken, newRefreshToken);
    }
}