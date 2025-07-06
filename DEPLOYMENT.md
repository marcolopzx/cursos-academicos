# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu aplicación de gestión académica en Render.

## 📋 Prerrequisitos

1. Tener una cuenta en [Render](https://render.com)
2. Tener tu proyecto en un repositorio de GitHub
3. Tener configurado Supabase para la base de datos

## 🏗️ Estructura del Proyecto

```
cursos-academicos/
├── backend/          # API Node.js + Express
├── frontend/         # React + Vite
└── package.json      # Workspace principal
```

## 📦 Despliegue del Backend

### 1. Crear Servicio Web en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

**Configuración Básica:**

- **Name**: `cursos-academicos-backend`
- **Environment**: `Node`
- **Region**: Elige la más cercana a tus usuarios
- **Branch**: `main` (o tu rama principal)

**Build & Deploy:**

- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`

### 2. Configurar Variables de Entorno

En la sección **"Environment Variables"** del servicio, agrega:

```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://tu-frontend-url.onrender.com
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 3. Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará el despliegue automáticamente
3. Espera a que termine el build y deployment

## 🌐 Despliegue del Frontend

### 1. Crear Servicio Estático en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Haz clic en **"New +"** → **"Static Site"**
3. Conecta tu repositorio de GitHub
4. Configura el servicio:

**Configuración Básica:**

- **Name**: `cursos-academicos-frontend`
- **Branch**: `main` (o tu rama principal)

**Build & Deploy:**

- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`

### 2. Configurar Variables de Entorno

En la sección **"Environment Variables"**, agrega:

```
VITE_API_URL=https://cursos-academicos-backend.onrender.com/api
```

### 3. Desplegar

1. Haz clic en **"Create Static Site"**
2. Render comenzará el despliegue automáticamente
3. Espera a que termine el build y deployment

## 🔧 Configuración de Supabase

### 1. Configurar CORS en Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Ve a **Settings** → **API**
3. En **"API Settings"**, agrega tu dominio de Render a **"Additional Allowed Origins"**:
   ```
   https://cursos-academicos-backend.onrender.com
   https://cursos-academicos-frontend.onrender.com
   ```

### 2. Verificar Variables de Entorno

Asegúrate de que las variables de Supabase estén correctamente configuradas en el backend:

- `SUPABASE_URL`: URL de tu proyecto Supabase
- `SUPABASE_ANON_KEY`: Clave anónima de tu proyecto Supabase

## 🔄 Despliegue Automático

Una vez configurado, Render desplegará automáticamente cada vez que hagas push a tu rama principal.

## 🧪 Verificación del Despliegue

### Backend

- URL: `https://cursos-academicos-backend.onrender.com`
- Health Check: `https://cursos-academicos-backend.onrender.com/health`
- API Docs: `https://cursos-academicos-backend.onrender.com/api-docs`

### Frontend

- URL: `https://cursos-academicos-frontend.onrender.com`

## 🐛 Solución de Problemas

### Error de Build

- Verifica que todas las dependencias estén en `package.json`
- Revisa los logs de build en Render Dashboard

### Error de CORS

- Verifica que `CORS_ORIGIN` esté configurado correctamente
- Asegúrate de que Supabase tenga configurado el dominio de Render

### Error de Conexión a Base de Datos

- Verifica las variables de Supabase
- Asegúrate de que las políticas de seguridad de Supabase permitan acceso desde Render

## 📞 Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs en Render Dashboard
2. Verifica la configuración de variables de entorno
3. Asegúrate de que Supabase esté configurado correctamente

## 🔗 URLs Finales

Una vez desplegado, tendrás:

- **Frontend**: `https://cursos-academicos-frontend.onrender.com`
- **Backend**: `https://cursos-academicos-backend.onrender.com`
- **API Docs**: `https://cursos-academicos-backend.onrender.com/api-docs`
