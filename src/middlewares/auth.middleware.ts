// middleware/auth.middleware.ts
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization

    if (!header) {
        return res.status(401).json({ message: "No hay token" })
    }

    const token = header.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Token mal formado" })
    }
    const secret = process.env.JWT_SECRET  // ← sacarlo aparte

    if (!secret) {
        return res.status(500).json({ message: "JWT secret no configurado" })
    }

    try {   
        const decoded = jwt.verify(token, secret);

        if (typeof decoded === "object" && decoded !== null && "id" in decoded) {
            const payload = decoded as { id: string };
        }
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" })
    }
}