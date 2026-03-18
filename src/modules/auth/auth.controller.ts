import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import  prisma from "../../config/prisma";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;  

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // JWT generado
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });


  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña requeridos" })
        }

        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" })
        }

        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" })

        return res.status(200).json({
            token,
            user: { id: user.id, name: user.name, email: user.email }
        })

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}