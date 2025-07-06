import { Request, Response } from "express";
import { CursoService } from "../services/cursoService";
import { ApiResponse } from "../types";

export class CursoController {
  private cursoService: CursoService;

  constructor() {
    this.cursoService = new CursoService();
  }

  // GET /api/cursos - Listar todos los cursos
  async getAllCursos(req: Request, res: Response): Promise<void> {
    try {
      const cursos = await this.cursoService.getAllCursos();

      const response: ApiResponse<typeof cursos> = {
        success: true,
        data: cursos,
        message: "Cursos obtenidos exitosamente",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // GET /api/cursos/:id - Obtener un curso por ID
  async getCursoById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const curso = await this.cursoService.getCursoById(id);

      if (!curso) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Curso no encontrado",
        };

        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<typeof curso> = {
        success: true,
        data: curso,
        message: "Curso obtenido exitosamente",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // GET /api/cursos/ciclo/:ciclo - Obtener cursos por ciclo
  async getCursosByCiclo(req: Request, res: Response): Promise<void> {
    try {
      const { ciclo } = req.params;
      const cursos = await this.cursoService.getCursosByCiclo(ciclo);

      const response: ApiResponse<typeof cursos> = {
        success: true,
        data: cursos,
        message: `Cursos del ciclo ${ciclo} obtenidos exitosamente`,
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // POST /api/cursos - Crear un nuevo curso
  async createCurso(req: Request, res: Response): Promise<void> {
    try {
      const cursoData = req.body;
      const nuevoCurso = await this.cursoService.createCurso(cursoData);

      const response: ApiResponse<typeof nuevoCurso> = {
        success: true,
        data: nuevoCurso,
        message: "Curso creado exitosamente",
      };

      res.status(201).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // PUT /api/cursos/:id - Actualizar un curso
  async updateCurso(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const cursoData = req.body;
      const cursoActualizado = await this.cursoService.updateCurso(
        id,
        cursoData
      );

      if (!cursoActualizado) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Curso no encontrado",
        };

        res.status(404).json(response);
        return;
      }

      const response: ApiResponse<typeof cursoActualizado> = {
        success: true,
        data: cursoActualizado,
        message: "Curso actualizado exitosamente",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // DELETE /api/cursos/:id - Eliminar un curso
  async deleteCurso(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const eliminado = await this.cursoService.deleteCurso(id);

      if (!eliminado) {
        const response: ApiResponse<null> = {
          success: false,
          error: "Error al eliminar el curso",
        };

        res.status(500).json(response);
        return;
      }

      const response: ApiResponse<null> = {
        success: true,
        message: "Curso eliminado exitosamente",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }

  // GET /api/docentes - Obtener todos los docentes (para el frontend)
  async getAllDocentes(req: Request, res: Response): Promise<void> {
    try {
      const docentes = await this.cursoService.getAllDocentes();

      const response: ApiResponse<typeof docentes> = {
        success: true,
        data: docentes,
        message: "Docentes obtenidos exitosamente",
      };

      res.status(200).json(response);
    } catch (error) {
      const response: ApiResponse<null> = {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
      };

      res.status(500).json(response);
    }
  }
}
