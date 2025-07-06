#!/bin/bash

# 🚀 Script de Despliegue para Render
# Este script te ayuda a preparar tu aplicación para el despliegue

echo "🚀 Preparando aplicación para despliegue en Render..."

# Verificar que estemos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo "❌ Error: No se encontró package.json. Asegúrate de estar en el directorio raíz del proyecto."
    exit 1
fi

# Verificar que existan los directorios backend y frontend
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: No se encontraron los directorios backend y frontend."
    exit 1
fi

echo "✅ Estructura del proyecto verificada"

# Instalar dependencias del workspace principal
echo "📦 Instalando dependencias del workspace principal..."
npm install

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
npm run build
cd ..

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Build completado exitosamente"

# Verificar que los builds se crearon correctamente
if [ ! -d "backend/dist" ]; then
    echo "❌ Error: No se encontró el directorio backend/dist. El build del backend falló."
    exit 1
fi

if [ ! -d "frontend/dist" ]; then
    echo "❌ Error: No se encontró el directorio frontend/dist. El build del frontend falló."
    exit 1
fi

echo "✅ Verificación de builds completada"

echo ""
echo "🎉 ¡Preparación completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Sube tu código a GitHub"
echo "2. Ve a https://dashboard.render.com"
echo "3. Crea dos servicios:"
echo "   - Web Service para el backend"
echo "   - Static Site para el frontend"
echo "4. Configura las variables de entorno según DEPLOYMENT.md"
echo ""
echo "📖 Consulta DEPLOYMENT.md para instrucciones detalladas"
echo "" 