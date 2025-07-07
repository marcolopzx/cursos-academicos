import { useEffect, useState } from "react";
import { docenteService } from "../services/api";
import { Docente } from "../types";

interface DocenteSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export default function DocenteSelect({
  value,
  onChange,
  error,
}: DocenteSelectProps) {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const data = await docenteService.getAllDocentes();
        setDocentes(data);
      } catch (error) {
        console.error("Error fetching docentes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, []);

  if (loading) {
    return (
      <div className="input-field bg-gray-100 animate-pulse">
        Cargando docentes...
      </div>
    );
  }

  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input-field ${error ? "border-red-500" : ""}`}
      >
        <option value="">Seleccionar docente</option>
        {docentes.map((docente) => (
          <option key={docente.id} value={docente.id}>
            {docente.apellidos}, {docente.nombre} - {docente.profesion}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
