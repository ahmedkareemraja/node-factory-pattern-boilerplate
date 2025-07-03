import { Express, Router } from "express";
import userRoutes from "./users/user.routes.v1";
import authRouter from "./auth/auth.routes.v1";
import { authenticateToken } from "../utils/encryption";

const routeConfig = {
    publicRoutes : [
        {
            path : "/api/v1/auth",
            router : authRouter
        }
    ],
    privateRoutes : [
        {
        path : "/api/v1/users",
        router : userRoutes
        }
]
}

export default (app : Express) => {
    const routerPublic = Router();
    const routerPrivate = Router();

    routerPrivate.use(authenticateToken);


    routeConfig.publicRoutes.forEach(route => {
        routerPublic.use(route.path, route.router);
    });


    routeConfig.privateRoutes.forEach(route => {
        routerPrivate.use(route.path, route.router);
      });

    app.use(routerPublic);
    app.use(routerPrivate);
}