# Sistema de Gestión Académica - Instituto Tecnológico San Juan

Este proyecto implementa un sistema completo de gestión académica con una API REST backend y un frontend React para la administración de cursos y docentes.

## Estructura del Proyecto

```
cursos-academicos/
├── backend/          # API REST con Express.js y Supabase
├── frontend/         # Aplicación React con TypeScript
├── package.json      # Configuración del monorepo
└── README.md         # Este archivo
```

## Características

### Backend (API REST)

- **Express.js** con TypeScript
- **Supabase** como base de datos
- Endpoints CRUD completos para cursos
- Validación de datos con Joi
- CORS habilitado para frontend

### Frontend (React)

- **React 18** con TypeScript
- **Vite** como bundler
- **Tailwind CSS** para estilos
- **React Router** para navegación
- **Axios** para comunicación con API
- Interfaz moderna y responsive

## Endpoints de la API

### Cursos

- `GET /api/cursos` - Listar todos los cursos con información de docentes
- `GET /api/cursos/:id` - Obtener un curso específico por ID
- `GET /api/cursos/ciclo/:ciclo` - Obtener cursos por ciclo (1-10)
- `POST /api/cursos` - Crear un nuevo curso
- `PUT /api/cursos/:id` - Actualizar un curso existente
- `DELETE /api/cursos/:id` - Eliminar un curso

### Docentes

- `GET /api/docentes` - Listar todos los docentes

### Información del Sistema

- `GET /` - Información general de la API
- `GET /health` - Estado de salud del servidor

📖 **Documentación interactiva**: [Swagger UI](http://localhost:3001/api-docs) (disponible cuando el servidor esté corriendo)

📖 **Documentación estática**: [API_DOCUMENTATION.md](backend/API_DOCUMENTATION.md)

📊 **Datos de ejemplo**: [example_data.sql](backend/example_data.sql)

## Instalación y Configuración

### Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de Supabase

### Configuración de Supabase

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Crear las tablas `docentes` y `cursos` con la estructura especificada
3. Obtener las credenciales de conexión

### Instalación

1. Clonar el repositorio:

```bash
git clone <repository-url>
cd cursos-academicos
```

2. Instalar dependencias:

```bash
npm run install:all
```

3. Configurar variables de entorno:

```bash
# En backend/.env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
PORT=3001

# En frontend/.env
VITE_API_URL=http://localhost:3001/api
```

4. Ejecutar el proyecto:

```bash
# Desarrollo (backend + frontend)
npm run dev

# O por separado:
npm run dev:backend  # Puerto 3001
npm run dev:frontend # Puerto 5173
```

## Uso

1. El backend estará disponible en `http://localhost:3001`
2. El frontend estará disponible en `http://localhost:5173`
3. Acceder al frontend para gestionar cursos y docentes

## Tecnologías Utilizadas

### Backend

- Node.js
- Express.js
- TypeScript
- Supabase (PostgreSQL)
- Joi (validación)
- CORS

### Frontend

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form

## Estructura de la Base de Datos

### Tabla: docentes

- `id` (UUID, Primary Key)
- `apellidos` (VARCHAR)
- `nombres` (VARCHAR)
- `profesion` (VARCHAR)
- `fecha_nacimiento` (DATE)
- `correo` (VARCHAR, UNIQUE)

### Tabla: cursos

- `id` (UUID, Primary Key)
- `curso` (VARCHAR)
- `creditos` (INT2)
- `hora_semanal` (INT2)
- `ciclo` (INT2)
- `id_docente` (UUID, Foreign Key -> docentes.id)
