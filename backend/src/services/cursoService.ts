import { supabase, TABLES } from "../config/supabase";
import {
  Curso,
  CursoWithDocente,
  CreateCursoRequest,
  UpdateCursoRequest,
} from "../types";

export class CursoService {
  // Obtener todos los cursos con información del docente
  async getAllCursos(): Promise<CursoWithDocente[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.CURSOS)
        .select(
          `
          *,
          docente:${TABLES.DOCENTES}(*)
        `
        )
        .order("ciclo", { ascending: true })
        .order("curso", { ascending: true });

      if (error) {
        throw new Error(`Error al obtener cursos: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Obtener un curso por ID con información del docente
  async getCursoById(id: string): Promise<CursoWithDocente | null> {
    try {
      const { data, error } = await supabase
        .from(TABLES.CURSOS)
        .select(
          `
          *,
          docente:${TABLES.DOCENTES}(*)
        `
        )
        .eq("id", id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          return null; // No encontrado
        }
        throw new Error(`Error al obtener curso: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Obtener cursos por ciclo
  async getCursosByCiclo(ciclo: string): Promise<CursoWithDocente[]> {
    try {
      const { data, error } = await supabase
        .from(TABLES.CURSOS)
        .select(
          `
          *,
          docente:${TABLES.DOCENTES}(*)
        `
        )
        .eq("ciclo", ciclo)
        .order("curso", { ascending: true });

      if (error) {
        throw new Error(`Error al obtener cursos por ciclo: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Crear un nuevo curso
  async createCurso(cursoData: CreateCursoRequest): Promise<Curso> {
    try {
      // Verificar que el docente existe
      const { data: docente, error: docenteError } = await supabase
        .from(TABLES.DOCENTES)
        .select("id")
        .eq("id", cursoData.id_docente)
        .single();

      if (docenteError || !docente) {
        throw new Error("El docente especificado no existe");
      }

      const { data, error } = await supabase
        .from(TABLES.CURSOS)
        .insert([cursoData])
        .select()
        .single();

      if (error) {
        throw new Error(`Error al crear curso: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Actualizar un curso
  async updateCurso(
    id: string,
    cursoData: UpdateCursoRequest
  ): Promise<Curso | null> {
    try {
      // Verificar que el curso existe
      const { data: existingCurso, error: checkError } = await supabase
        .from(TABLES.CURSOS)
        .select("id")
        .eq("id", id)
        .single();

      if (checkError || !existingCurso) {
        return null; // No encontrado
      }

      // Si se está actualizando el docente, verificar que existe
      if (cursoData.id_docente) {
        const { data: docente, error: docenteError } = await supabase
          .from(TABLES.DOCENTES)
          .select("id")
          .eq("id", cursoData.id_docente)
          .single();

        if (docenteError || !docente) {
          throw new Error("El docente especificado no existe");
        }
      }

      const { data, error } = await supabase
        .from(TABLES.CURSOS)
        .update(cursoData)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(`Error al actualizar curso: ${error.message}`);
      }

      return data;
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Eliminar un curso
  async deleteCurso(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from(TABLES.CURSOS)
        .delete()
        .eq("id", id);

      if (error) {
        throw new Error(`Error al eliminar curso: ${error.message}`);
      }

      return true;
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }

  // Obtener todos los docentes (para el frontend)
  async getAllDocentes() {
    try {
      const { data, error } = await supabase
        .from(TABLES.DOCENTES)
        .select("*")
        .order("apellidos", { ascending: true });
      console.log(data);
      if (error) {
        throw new Error(`Error al obtener docentes: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      throw new Error(
        `Error en el servicio: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  }
}
