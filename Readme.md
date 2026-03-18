# 📝 Todo REST API
 
Backend REST API para una aplicación de gestión de tareas con autenticación JWT.  
**Listo para conectar con cualquier frontend.**
 
---
 
## 🚀 Demo en vivo
 
> API ya se desplego en Railway y  funciona  
 
## ⚙️ Stack
 
| Tecnología | Uso |
|------------|-----|
| Node.js + TypeScript | Servidor |
| Express | Web framework |
| Prisma ORM | Acceso a base de datos |
| PostgreSQL | Base de datos |
| JWT | Autenticación |
| bcryptjs | Hash de contraseñas |
| Railway | Deploy |
 
---
 
## 📁 Estructura del proyecto
 
```
src/
  middlewares/
    auth.middleware.ts     ← Verifica el JWT en rutas protegidas
  modules/
    auth/
      auth.controller.ts   ← Register y Login
      auth.routes.ts       ← Rutas públicas y protegidas
    tasks/
      tasks.controller.ts  ← CRUD de tareas
  types/
    express.d.ts           ← Extiende Request con req.user
  config/
    prisma.ts              ← Cliente de Prisma
index.ts                   ← Entry point
```
 
---
 
## 🔌 Endpoints
 
### Auth (públicos)
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/register` | Registrar usuario |
| POST | `/api/auth/login` | Iniciar sesión |
 
**Body register:**
```json
{
  "name": "Juan",
  "email": "juan@correo.com",
  "password": "12345678"
}
```
 
**Respuesta:**
```json
{
  "token": "eyJhbGci...",
  "user": {
    "id": "uuid",
    "name": "Juan",
    "email": "juan@correo.com"
  }
}
```
 
---
 
### Tasks (protegidas — requieren JWT)
 
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Obtener todas las tareas del usuario |
| POST | `/api/tasks` | Crear una nueva tarea |
| PUT | `/api/tasks/:id` | Actualizar una tarea |
| DELETE | `/api/tasks/:id` | Eliminar una tarea |
 
**Header requerido:**
```
Authorization: Bearer TU_TOKEN_JWT
```
 
**Body POST /tasks:**
```json
{
  "description": "Mi nueva tarea"
}
```
 
**Body PUT /tasks/:id:**
```json
{
  "done": true
}
```
 
---
 
## 🔐 Flujo de autenticación
 
```
1. Usuario hace register o login
2. Backend devuelve JWT con { token, user }
3. Frontend guarda el token
4. Cada petición protegida envía:
   Authorization: Bearer TOKEN
5. Middleware verifica el token
6. Controlador accede a req.user.id
```
 
---
 
## 🛠️ Correr localmente
 
```bash
# 1. Clonar el repositorio
git clone https://github.com/AlexSFCodes/todo-rest-api
 
# 2. Instalar dependencias
npm install
 
# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores
 
# 4. Correr migraciones
npx prisma migrate dev
 
# 5. Iniciar el servidor
npm run dev
```
 
---
 
## 🌐 Variables de entorno
 
```env
DATABASE_URL=postgresql://user:password@localhost:5432/todolist
JWT_SECRET=tu_clave_secreta_aqui
```
 
---
 
## 🔗 Frontend relacionado
 
Este backend está diseñado para conectarse con el frontend en Vite:  
👉 [todo-frontend](https://github.com/AlexSFCodes/ToDoList)
 
Para conectar el frontend, configura en su `.env`:
```env
VITE_API_URL=https://todo-rest-api-production-f0b5.up.railway.app/api
```
 
---
 
## 📊 Base de datos
 
```prisma
model User {
  id       String  @id @default(uuid())
  name     String
  email    String  @unique
  password String
  tasks    Task[]
}
 
model Task {
  id          String   @id @default(uuid())
  description String
  done        Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```