import { Router } from "express";
import { CursoController } from "../controllers/cursoController";

/**
 * @swagger
 * tags:
 *   name: Docentes
 *   description: Gestión de docentes académicos
 */

const router = Router();
const cursoController = new CursoController();

/**
 * @swagger
 * /api/docentes:
 *   get:
 *     summary: Obtiene todos los docentes
 *     description: Retorna una lista de todos los docentes registrados
 *     tags: [Docentes]
 *     responses:
 *       200:
 *         description: Lista de docentes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Docente'
 *                 message:
 *                   type: string
 *                   example: Docentes obtenidos exitosamente
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /api/docentes - Obtener todos los docentes
router.get("/", cursoController.getAllDocentes.bind(cursoController));

export default router;
