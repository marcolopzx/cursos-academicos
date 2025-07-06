import { useForm } from "react-hook-form";
import { CreateCursoRequest, UpdateCursoRequest, Ciclo } from "../types";
import DocenteSelect from "./DocenteSelect";

interface CursoFormProps {
  initialData?: Partial<CreateCursoRequest>;
  onSubmit: (data: CreateCursoRequest | UpdateCursoRequest) => void;
  loading: boolean;
  isEditing?: boolean;
}

export default function CursoForm({
  initialData,
  onSubmit,
  loading,
  isEditing = false,
}: CursoFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateCursoRequest>({
    defaultValues: initialData,
  });

  const selectedDocente = watch("id_docente");

  const ciclos: Ciclo[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleDocenteChange = (value: string) => {
    setValue("id_docente", value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          {isEditing ? "Editar Curso" : "Nuevo Curso"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre del curso */}
          <div className="md:col-span-2">
            <label
              htmlFor="curso"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nombre del Curso *
            </label>
            <input
              id="curso"
              type="text"
              {...register("curso", {
                required: "El nombre del curso es requerido",
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 3 caracteres",
                },
                maxLength: {
                  value: 100,
                  message: "El nombre no puede exceder 100 caracteres",
                },
              })}
              className={`input-field ${errors.curso ? "border-red-500" : ""}`}
              placeholder="Ej: Programación I"
            />
            {errors.curso && (
              <p className="mt-1 text-sm text-red-600">
                {errors.curso.message}
              </p>
            )}
          </div>

          {/* Créditos */}
          <div>
            <label
              htmlFor="creditos"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Créditos *
            </label>
            <input
              id="creditos"
              type="number"
              min="1"
              max="10"
              {...register("creditos", {
                required: "Los créditos son requeridos",
                min: {
                  value: 1,
                  message: "Los créditos deben ser al menos 1",
                },
                max: {
                  value: 10,
                  message: "Los créditos no pueden exceder 10",
                },
                valueAsNumber: true,
              })}
              className={`input-field ${
                errors.creditos ? "border-red-500" : ""
              }`}
              placeholder="1-10"
            />
            {errors.creditos && (
              <p className="mt-1 text-sm text-red-600">
                {errors.creditos.message}
              </p>
            )}
          </div>

          {/* Horas semanales */}
          <div>
            <label
              htmlFor="hora_semanal"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Horas Semanales *
            </label>
            <input
              id="hora_semanal"
              type="number"
              min="1"
              max="20"
              {...register("hora_semanal", {
                required: "Las horas semanales son requeridas",
                min: {
                  value: 1,
                  message: "Las horas deben ser al menos 1",
                },
                max: {
                  value: 20,
                  message: "Las horas no pueden exceder 20",
                },
                valueAsNumber: true,
              })}
              className={`input-field ${
                errors.hora_semanal ? "border-red-500" : ""
              }`}
              placeholder="1-20"
            />
            {errors.hora_semanal && (
              <p className="mt-1 text-sm text-red-600">
                {errors.hora_semanal.message}
              </p>
            )}
          </div>

          {/* Ciclo */}
          <div>
            <label
              htmlFor="ciclo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Ciclo *
            </label>
            <select
              id="ciclo"
              {...register("ciclo", {
                required: "El ciclo es requerido",
                valueAsNumber: true,
              })}
              className={`input-field ${errors.ciclo ? "border-red-500" : ""}`}
            >
              <option value="">Seleccionar ciclo</option>
              {ciclos.map((ciclo) => (
                <option key={ciclo} value={ciclo}>
                  Ciclo {ciclo}
                </option>
              ))}
            </select>
            {errors.ciclo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.ciclo.message}
              </p>
            )}
          </div>

          {/* Docente */}
          <div>
            <label
              htmlFor="id_docente"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Docente *
            </label>
            <DocenteSelect
              value={selectedDocente || ""}
              onChange={handleDocenteChange}
              error={errors.id_docente?.message}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="btn-secondary"
            disabled={loading}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Guardando..." : isEditing ? "Actualizar" : "Crear"}
          </button>
        </div>
      </div>
    </form>
  );
}
