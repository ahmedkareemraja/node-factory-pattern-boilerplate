import { IUserController, UserController } from "../../controllers/users.controller";
import { IUsersRepository, UserRepository } from "../../repositories/users.repositorty";
import { IUsersService, UsersService } from "../../services/users.service";

export class UserFactory{
    static createController() : IUserController{
        const userService = this.createService();
        return new UserController(userService);
    }

    static createService() : IUsersService{
        const userRepository = this.createRepository();
        return new UsersService(userRepository);
    }

    static createRepository() : IUsersRepository{
        return new UserRepository();
    }
}