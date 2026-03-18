import express from "express"
import cors from "cors"
import authRoutes from "./src/modules/auth/auth.routes"

const app = express()  // ← primero declara app

// Middlewares globales
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://alexsfcodes.github.io"  // ← tu dominio de GitHub Pages
    ]
}))
app.use(express.json())

// Rutas
app.use("/api", authRoutes)

app.listen(3000, () => {
    console.log("Server corriendo en puerto 3000")
})