import { Router } from "express";
import { UserFactory } from "../../utils/factory/user.factory";
const router = Router();

const userController = UserFactory.createController();



router.get("/", (req, res, next)=>{
    userController.getUsers(req, res, next);
});

export default router;