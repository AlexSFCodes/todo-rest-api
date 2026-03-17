import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import  prisma from "../../config/prisma";

import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;  // ← agregar name

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

    // ← generar y devolver el token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

    return res.status(201).json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });


  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};