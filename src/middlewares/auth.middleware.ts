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

    const secret = process.env.JWT_SECRET
    if (!secret) {
        return res.status(500).json({ message: "JWT secret no configurado" })
    }

    try {   
        const payload = jwt.verify(token, secret) as unknown as { id: string }
        console.log("PAYLOAD:", payload)
        req.user = payload
        console.log("REQ.USER:", req.user)
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" })
    }
}