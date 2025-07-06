import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import { CursoWithDocente } from "../types";
import { cursoService } from "../services/api";
import CursoList from "../components/CursoList";
import toast from "react-hot-toast";

export default function CursosPage() {
  const [cursos, setCursos] = useState<CursoWithDocente[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchCursos = async () => {
    try {
      const data = await cursoService.getAllCursos();
      setCursos(data);
    } catch (error) {
      console.error("Error fetching cursos:", error);
      toast.error("Error al cargar los cursos");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await cursoService.deleteCurso(id);
      setCursos(cursos.filter((curso) => curso.id !== id));
      toast.success("Curso eliminado exitosamente");
    } catch (error) {
      console.error("Error deleting curso:", error);
      toast.error("Error al eliminar el curso");
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCursos();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Cursos Académicos
          </h1>
          <p className="text-gray-600 mt-1">
            Gestiona la malla curricular del Instituto Tecnológico San Juan
          </p>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-secondary flex items-center"
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
            />
            {refreshing ? "Actualizando..." : "Actualizar"}
          </button>

          <Link to="/cursos/nuevo" className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Curso
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4">
          <div className="text-sm font-medium text-gray-500">
            Total de Cursos
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {cursos.length}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm font-medium text-gray-500">
            Ciclos Activos
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(cursos.map((c) => c.ciclo)).size}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm font-medium text-gray-500">
            Docentes Asignados
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {new Set(cursos.map((c) => c.id_docente)).size}
          </div>
        </div>

        <div className="card p-4">
          <div className="text-sm font-medium text-gray-500">
            Total Créditos
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {cursos.reduce((sum, curso) => sum + curso.creditos, 0)}
          </div>
        </div>
      </div>

      {/* Course List */}
      <CursoList cursos={cursos} onDelete={handleDelete} loading={loading} />
    </div>
  );
}
