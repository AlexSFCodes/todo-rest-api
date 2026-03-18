import express from "express"
import authRoutes from "./src/modules/auth/auth.routes"

const app = express()

// Middlewares globales
app.use(express.json())

// Rutas
app.use("/api", authRoutes)

app.listen(3000, () => {
    console.log("Server corriendo en puerto 3000")
})