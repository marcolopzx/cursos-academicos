import axios from "axios";
import {
  Curso,
  CursoWithDocente,
  CreateCursoRequest,
  UpdateCursoRequest,
  Docente,
  ApiResponse,
} from "../types";

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const cursoService = {
  // Obtener todos los cursos
  async getAllCursos(): Promise<CursoWithDocente[]> {
    const response = await api.get<ApiResponse<CursoWithDocente[]>>("/cursos");
    return response.data.data || [];
  },

  // Obtener un curso por ID
  async getCursoById(id: string): Promise<CursoWithDocente | null> {
    try {
      const response = await api.get<ApiResponse<CursoWithDocente>>(
        `/cursos/${id}`
      );
      return response.data.data || null;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  },

  // Obtener cursos por ciclo
  async getCursosByCiclo(ciclo: string): Promise<CursoWithDocente[]> {
    const response = await api.get<ApiResponse<CursoWithDocente[]>>(
      `/cursos/ciclo/${ciclo}`
    );
    return response.data.data || [];
  },

  // Crear un nuevo curso
  async createCurso(cursoData: CreateCursoRequest): Promise<Curso> {
    const response = await api.post<ApiResponse<Curso>>("/cursos", cursoData);
    return response.data.data!;
  },

  // Actualizar un curso
  async updateCurso(id: string, cursoData: UpdateCursoRequest): Promise<Curso> {
    const response = await api.put<ApiResponse<Curso>>(
      `/cursos/${id}`,
      cursoData
    );
    return response.data.data!;
  },

  // Eliminar un curso
  async deleteCurso(id: string): Promise<void> {
    await api.delete(`/cursos/${id}`);
  },
};

export const docenteService = {
  // Obtener todos los docentes
  async getAllDocentes(): Promise<Docente[]> {
    const response = await api.get<ApiResponse<Docente[]>>("/docentes");
    return response.data.data || [];
  },
};

export default api;
