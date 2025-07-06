import { Router } from "express";
import { CursoController } from "../controllers/cursoController";
import { validateRequest, validateParams } from "../middleware/validation";
import {
  createCursoSchema,
  updateCursoSchema,
  cursoIdSchema,
  cicloSchema,
} from "../validations/cursoValidation";

/**
 * @swagger
 * tags:
 *   name: Cursos
 *   description: Gestión de cursos académicos
 */

const router = Router();
const cursoController = new CursoController();

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtiene todos los cursos
 *     description: Retorna una lista de todos los cursos con información de sus docentes
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
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
 *                     $ref: '#/components/schemas/CursoWithDocente'
 *                 message:
 *                   type: string
 *                   example: Cursos obtenidos exitosamente
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /api/cursos - Listar todos los cursos
router.get("/", cursoController.getAllCursos.bind(cursoController));

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtiene un curso por ID
 *     description: Retorna la información de un curso específico con datos de su docente
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Curso obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/CursoWithDocente'
 *                 message:
 *                   type: string
 *                   example: Curso obtenido exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /api/cursos/:id - Obtener un curso por ID
router.get(
  "/:id",
  validateParams(cursoIdSchema),
  cursoController.getCursoById.bind(cursoController)
);

/**
 * @swagger
 * /api/cursos/ciclo/{ciclo}:
 *   get:
 *     summary: Obtiene cursos por ciclo
 *     description: Retorna todos los cursos de un ciclo específico
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: ciclo
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *         description: Número del ciclo académico (1-10)
 *     responses:
 *       200:
 *         description: Cursos del ciclo obtenidos exitosamente
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
 *                     $ref: '#/components/schemas/CursoWithDocente'
 *                 message:
 *                   type: string
 *                   example: Cursos del ciclo 1 obtenidos exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// GET /api/cursos/ciclo/:ciclo - Obtener cursos por ciclo
router.get(
  "/ciclo/:ciclo",
  validateParams(cicloSchema),
  cursoController.getCursosByCiclo.bind(cursoController)
);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Crea un nuevo curso
 *     description: Crea un nuevo curso en el sistema académico
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCursoRequest'
 *           example:
 *             curso: "Programación I"
 *             creditos: 4
 *             hora_semanal: 6
 *             ciclo: 1
 *             id_docente: "550e8400-e29b-41d4-a716-446655440001"
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Curso'
 *                 message:
 *                   type: string
 *                   example: Curso creado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// POST /api/cursos - Crear un nuevo curso
router.post(
  "/",
  validateRequest(createCursoSchema),
  cursoController.createCurso.bind(cursoController)
);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Actualiza un curso existente
 *     description: Actualiza la información de un curso específico
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del curso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCursoRequest'
 *           example:
 *             curso: "Programación Avanzada"
 *             creditos: 5
 *             hora_semanal: 8
 *             ciclo: 2
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Curso'
 *                 message:
 *                   type: string
 *                   example: Curso actualizado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// PUT /api/cursos/:id - Actualizar un curso
router.put(
  "/:id",
  validateParams(cursoIdSchema),
  validateRequest(updateCursoSchema),
  cursoController.updateCurso.bind(cursoController)
);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Elimina un curso
 *     description: Elimina un curso específico del sistema
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID único del curso
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Curso eliminado exitosamente
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
// DELETE /api/cursos/:id - Eliminar un curso
router.delete(
  "/:id",
  validateParams(cursoIdSchema),
  cursoController.deleteCurso.bind(cursoController)
);

export default router;
