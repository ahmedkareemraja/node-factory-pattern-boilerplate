import cors from 'cors';

export const devCorsOptions: cors.CorsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Range', 'X-Content-Range', 'X-Total-Count'],
    maxAge: 86400, // Cache preflight requests for 24 hours
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
};

export const getCorsOptions = (): cors.CorsOptions => {
    // const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;
    
    // if (isDevelopment) {
    //     return devCorsOptions;
    // }
    return devCorsOptions;
    

};
