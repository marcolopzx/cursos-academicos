import Joi from "joi";

export const createCursoSchema = Joi.object({
  curso: Joi.string().required().min(3).max(100).messages({
    "string.empty": "El nombre del curso es requerido",
    "string.min": "El nombre del curso debe tener al menos 3 caracteres",
    "string.max": "El nombre del curso no puede exceder 100 caracteres",
  }),
  creditos: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "Los créditos deben ser un número",
    "number.integer": "Los créditos deben ser un número entero",
    "number.min": "Los créditos deben ser al menos 1",
    "number.max": "Los créditos no pueden exceder 10",
  }),
  hora_semanal: Joi.number().integer().min(1).max(20).required().messages({
    "number.base": "Las horas semanales deben ser un número",
    "number.integer": "Las horas semanales deben ser un número entero",
    "number.min": "Las horas semanales deben ser al menos 1",
    "number.max": "Las horas semanales no pueden exceder 20",
  }),
  ciclo: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "El ciclo debe ser un número",
    "number.integer": "El ciclo debe ser un número entero",
    "number.min": "El ciclo debe ser al menos 1",
    "number.max": "El ciclo no puede exceder 10",
  }),
  id_docente: Joi.string().uuid().required().messages({
    "string.empty": "El ID del docente es requerido",
    "string.guid": "El ID del docente debe ser un UUID válido",
  }),
});

export const updateCursoSchema = Joi.object({
  curso: Joi.string().min(3).max(100).optional().messages({
    "string.min": "El nombre del curso debe tener al menos 3 caracteres",
    "string.max": "El nombre del curso no puede exceder 100 caracteres",
  }),
  creditos: Joi.number().integer().min(1).max(10).optional().messages({
    "number.base": "Los créditos deben ser un número",
    "number.integer": "Los créditos deben ser un número entero",
    "number.min": "Los créditos deben ser al menos 1",
    "number.max": "Los créditos no pueden exceder 10",
  }),
  hora_semanal: Joi.number().integer().min(1).max(20).optional().messages({
    "number.base": "Las horas semanales deben ser un número",
    "number.integer": "Las horas semanales deben ser un número entero",
    "number.min": "Las horas semanales deben ser al menos 1",
    "number.max": "Las horas semanales no pueden exceder 20",
  }),
  ciclo: Joi.number().integer().min(1).max(10).optional().messages({
    "number.base": "El ciclo debe ser un número",
    "number.integer": "El ciclo debe ser un número entero",
    "number.min": "El ciclo debe ser al menos 1",
    "number.max": "El ciclo no puede exceder 10",
  }),
  id_docente: Joi.string().uuid().optional().messages({
    "string.guid": "El ID del docente debe ser un UUID válido",
  }),
});

export const cursoIdSchema = Joi.object({
  id: Joi.string().uuid().required().messages({
    "string.empty": "El ID del curso es requerido",
    "string.guid": "El ID del curso debe ser un UUID válido",
  }),
});

export const cicloSchema = Joi.object({
  ciclo: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "El ciclo debe ser un número",
    "number.integer": "El ciclo debe ser un número entero",
    "number.min": "El ciclo debe ser al menos 1",
    "number.max": "El ciclo no puede exceder 10",
  }),
});
