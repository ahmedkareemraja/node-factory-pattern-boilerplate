import crypto from "crypto";
import { RequestHandler, Request } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
}

const generateHash = (password : string, salt : string) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

const generatePassword = (password : string) => {
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    return { salt, hash };
}

const verifyPassword = (password : string, hash : string, salt : string) => {
    return generateHash(password, salt) === hash;
}

const generateToken = (payload : any) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn : "1h"});
}

const generateRefreshToken = (payload : any) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {expiresIn : "7d"});
}

export const authenticateToken: RequestHandler = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {   
        res.status(401).json({ error: "Access token required" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ error: "Invalid or expired token" });
        return;
    }
};

export const verifyRefreshToken = (token: string) => {
    const secret = process.env.REFRESH_TOKEN_SECRET!;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        throw new Error("Invalid refresh token");
    }
}

export { generateSalt, generateHash, generatePassword, verifyPassword, generateToken, generateRefreshToken };