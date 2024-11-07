// api-gateway/middlewares/jwt-auth.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload;
}

const exceptPaths = ["/login", "/register"];

const jwtAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    if (exceptPaths.includes(req.path)) {
        return next(); // Skip authentication
    }

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export default jwtAuth;
