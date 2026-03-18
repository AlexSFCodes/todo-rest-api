import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import  prisma from "../../config/prisma";
import jwt from "jsonwebtoken";


export const getTasks = async (req: Request, res: Response) => {
    try {

        const userId = req.user?.id
        if (!userId) return res.status(401).json({ message: "No autorizado" })

        const tasks = await prisma.task.findMany({
            where: { userId: userId }  
        })

        return res.status(200).json(tasks)

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export const createTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) return res.status(401).json({ message: "No autorizado" })

        const { description } = req.body
        if (!description) return res.status(400).json({ message: "Descripción requerida" })

        const task = await prisma.task.create({
            data: {
                description,
                userId
            }
        })
        return res.status(201).json(task)

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) return res.status(401).json({ message: "No autorizado" })

        const { id } = req.params
        if (!id) return res.status(400).json({ message: "Requiere id de tarea" })

        const deletedTask = await prisma.task.delete({ where: { id } })
        return res.status(200).json(deletedTask)

    } catch (error) {
        return res.status(500).json({ message: "Server error" })
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) return res.status(401).json({ message: "No autorizado" })

        const { id } = req.params
        const { description, done } = req.body

        const task = await prisma.task.update({
            where: { id },
            data: { description, done }
        })

        return res.status(200).json(task)
    } catch (error) {
        console.log("ERROR:", error)  // ← agrega esto
        return res.status(500).json({ message: "Server error" })
    }
}