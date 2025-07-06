import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { CreateCursoRequest, UpdateCursoRequest } from "../types";
import { cursoService } from "../services/api";
import CursoForm from "../components/CursoForm";
import toast from "react-hot-toast";

export default function CursoFormPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Partial<CreateCursoRequest> | undefined
  >();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchCurso();
    }
  }, [id]);

  const fetchCurso = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const curso = await cursoService.getCursoById(id);

      if (!curso) {
        toast.error("Curso no encontrado");
        navigate("/cursos");
        return;
      }

      setInitialData({
        curso: curso.curso,
        creditos: curso.creditos,
        hora_semanal: curso.hora_semanal,
        ciclo: curso.ciclo,
        id_docente: curso.id_docente,
      });
    } catch (error) {
      console.error("Error fetching curso:", error);
      toast.error("Error al cargar el curso");
      navigate("/cursos");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (
    data: CreateCursoRequest | UpdateCursoRequest
  ) => {
    try {
      setLoading(true);

      if (isEditing && id) {
        await cursoService.updateCurso(id, data as UpdateCursoRequest);
        toast.success("Curso actualizado exitosamente");
      } else {
        await cursoService.createCurso(data as CreateCursoRequest);
        toast.success("Curso creado exitosamente");
      }

      navigate("/cursos");
    } catch (error: any) {
      console.error("Error saving curso:", error);
      const errorMessage =
        error.response?.data?.error || "Error al guardar el curso";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/cursos")}
          className="btn-secondary flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Editar Curso" : "Nuevo Curso"}
          </h1>
          <p className="text-gray-600 mt-1">
            {isEditing
              ? "Modifica la información del curso"
              : "Agrega un nuevo curso a la malla curricular"}
          </p>
        </div>
      </div>

      {/* Form */}
      <CursoForm
        initialData={initialData}
        onSubmit={handleSubmit}
        loading={loading}
        isEditing={isEditing}
      />
    </div>
  );
}
