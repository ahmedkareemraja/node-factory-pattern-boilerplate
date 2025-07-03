import { AuthController } from "../../controllers/auth.controller";
import { UserRepository } from "../../repositories/users.repositorty";
import { UsersService } from "../../services/users.service";

class AuthFactory{
    static createController(): AuthController{
        const userRepository = new UserRepository() ;
        const userService = new UsersService(userRepository);
        return new AuthController(userService);
    }
}

export default AuthFactory;