import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import cursoRoutes from "./routes/cursoRoutes";
import docenteRoutes from "./routes/docenteRoutes";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de seguridad
app.use(helmet());

// Middleware de logging
app.use(morgan("combined"));

// Middleware de CORS
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware para parsear JSON
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Documentación Swagger
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss: ".swagger-ui .topbar { display: none }",
    customSiteTitle: "API de Gestión Académica - Documentación",
  })
);

// Rutas de la API
app.use("/api/cursos", cursoRoutes);
app.use("/api/docentes", docenteRoutes);

// Ruta de salud
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de Gestión Académica funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Ruta por defecto
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Bienvenido a la API de Gestión Académica del Instituto Tecnológico San Juan",
    version: "1.0.0",
    endpoints: {
      cursos: "/api/cursos",
      docentes: "/api/docentes",
      health: "/health",
    },
  });
});

// Middleware para manejar rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
  });
});

// Middleware para manejar errores globales
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error no manejado:", error);

    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
    });
  }
);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 API de Gestión Académica - Instituto Tecnológico San Juan`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || "development"}`);
});

export default app;
