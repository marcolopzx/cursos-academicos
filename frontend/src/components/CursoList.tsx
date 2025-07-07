import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Search, Filter } from "lucide-react";
import { CursoWithDocente, Ciclo } from "../types";
import toast from "react-hot-toast";

interface CursoListProps {
  cursos: CursoWithDocente[];
  onDelete: (id: string) => void;
  loading: boolean;
}

export default function CursoList({
  cursos,
  onDelete,
  loading,
}: CursoListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCiclo, setSelectedCiclo] = useState<string>("");

  const ciclos: Ciclo[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const filteredCursos = cursos.filter((curso) => {
    const matchesSearch =
      curso.curso.toLowerCase().includes(searchTerm.toLowerCase()) ||
      curso.docente?.apellidos
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      curso.docente?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCiclo =
      !selectedCiclo || curso.ciclo.toString() === selectedCiclo;

    return matchesSearch && matchesCiclo;
  });

  const handleDelete = (id: string, cursoName: string) => {
    if (
      window.confirm(
        `¿Estás seguro de que quieres eliminar el curso "${cursoName}"?`
      )
    ) {
      onDelete(id);
      toast.success("Curso eliminado exitosamente");
    }
  };

  if (loading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {/* Header with search and filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre del curso o docente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCiclo}
              onChange={(e) => setSelectedCiclo(e.target.value)}
              className="input-field w-32"
            >
              <option value="">Todos los ciclos</option>
              {ciclos.map((ciclo) => (
                <option key={ciclo} value={ciclo}>
                  Ciclo {ciclo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Curso
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Créditos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horas/Semana
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ciclo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Docente
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCursos.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {searchTerm || selectedCiclo
                    ? "No se encontraron cursos con los filtros aplicados"
                    : "No hay cursos registrados"}
                </td>
              </tr>
            ) : (
              filteredCursos.map((curso) => (
                <tr key={curso.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {curso.curso}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {curso.creditos}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {curso.hora_semanal}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      Ciclo {curso.ciclo}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {curso.docente
                        ? `${curso.docente.apellidos}, ${curso.docente.nombre}`
                        : "Sin asignar"}
                    </div>
                    {curso.docente && (
                      <div className="text-sm text-gray-500">
                        {curso.docente.profesion}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/cursos/editar/${curso.id}`}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="Editar curso"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(curso.id, curso.curso)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Eliminar curso"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer with count */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <div className="text-sm text-gray-500">
          {filteredCursos.length} de {cursos.length} cursos mostrados
        </div>
      </div>
    </div>
  );
}
