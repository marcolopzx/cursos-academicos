export interface Docente {
  id: string;
  apellidos: string;
  nombres: string;
  profesion: string;
  fecha_nacimiento: string;
  correo: string;
  created_at?: string;
  updated_at?: string;
}

export interface Curso {
  id: string;
  curso: string;
  creditos: number;
  hora_semanal: number;
  ciclo: number;
  id_docente: string;
  created_at?: string;
  updated_at?: string;
}

export interface CursoWithDocente extends Curso {
  docente?: Docente;
}

export interface CreateCursoRequest {
  curso: string;
  creditos: number;
  hora_semanal: number;
  ciclo: number;
  id_docente: string;
}

export interface UpdateCursoRequest extends Partial<CreateCursoRequest> {}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export type Ciclo = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
