import { Router } from "express";
import AuthFactory from "../../utils/factory/auth.factory";

const authRouter = Router();

const authController = AuthFactory.createController();

authRouter.post("/register", (req, res, next)=>{
    authController.register(req, res, next);
});
authRouter.post("/login", (req, res, next)=>{
    authController.login(req, res, next);
});

authRouter.post("/refresh", (req, res, next) => {
    authController.refreshToken(req, res, next);
});

export default authRouter;