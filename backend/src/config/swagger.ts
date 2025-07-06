import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión Académica - Instituto Tecnológico San Juan",
      version: "1.0.0",
      description:
        "API REST para la gestión de cursos y docentes del sistema académico",
      contact: {
        name: "Equipo de Desarrollo",
        email: "desarrollo@instituto.edu",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        Docente: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único del docente",
            },
            apellidos: {
              type: "string",
              description: "Apellidos del docente",
            },
            nombres: {
              type: "string",
              description: "Nombres del docente",
            },
            profesion: {
              type: "string",
              description: "Profesión del docente",
            },
            fecha_nacimiento: {
              type: "string",
              format: "date",
              description: "Fecha de nacimiento del docente",
            },
            correo: {
              type: "string",
              format: "email",
              description: "Correo electrónico del docente",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación del registro",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
          required: [
            "apellidos",
            "nombres",
            "profesion",
            "fecha_nacimiento",
            "correo",
          ],
        },
        Curso: {
          type: "object",
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "ID único del curso",
            },
            curso: {
              type: "string",
              description: "Nombre del curso",
              minLength: 3,
              maxLength: 100,
            },
            creditos: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Número de créditos del curso",
            },
            hora_semanal: {
              type: "integer",
              minimum: 1,
              maximum: 20,
              description: "Horas semanales del curso",
            },
            ciclo: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Ciclo académico del curso",
            },
            id_docente: {
              type: "string",
              format: "uuid",
              description: "ID del docente asignado al curso",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Fecha de creación del registro",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Fecha de última actualización",
            },
          },
          required: [
            "curso",
            "creditos",
            "hora_semanal",
            "ciclo",
            "id_docente",
          ],
        },
        CursoWithDocente: {
          type: "object",
          allOf: [
            { $ref: "#/components/schemas/Curso" },
            {
              type: "object",
              properties: {
                docente: {
                  $ref: "#/components/schemas/Docente",
                },
              },
            },
          ],
        },
        CreateCursoRequest: {
          type: "object",
          properties: {
            curso: {
              type: "string",
              description: "Nombre del curso",
              minLength: 3,
              maxLength: 100,
            },
            creditos: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Número de créditos del curso",
            },
            hora_semanal: {
              type: "integer",
              minimum: 1,
              maximum: 20,
              description: "Horas semanales del curso",
            },
            ciclo: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Ciclo académico del curso",
            },
            id_docente: {
              type: "string",
              format: "uuid",
              description: "ID del docente asignado al curso",
            },
          },
          required: [
            "curso",
            "creditos",
            "hora_semanal",
            "ciclo",
            "id_docente",
          ],
        },
        UpdateCursoRequest: {
          type: "object",
          properties: {
            curso: {
              type: "string",
              description: "Nombre del curso",
              minLength: 3,
              maxLength: 100,
            },
            creditos: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Número de créditos del curso",
            },
            hora_semanal: {
              type: "integer",
              minimum: 1,
              maximum: 20,
              description: "Horas semanales del curso",
            },
            ciclo: {
              type: "integer",
              minimum: 1,
              maximum: 10,
              description: "Ciclo académico del curso",
            },
            id_docente: {
              type: "string",
              format: "uuid",
              description: "ID del docente asignado al curso",
            },
          },
        },
        ApiResponse: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              description: "Indica si la operación fue exitosa",
            },
            data: {
              description: "Datos de la respuesta",
            },
            message: {
              type: "string",
              description: "Mensaje descriptivo de la operación",
            },
            error: {
              type: "string",
              description: "Mensaje de error (solo en caso de error)",
            },
          },
          required: ["success"],
        },
      },
      responses: {
        BadRequest: {
          description: "Datos inválidos",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                success: false,
                error: "El nombre del curso es requerido",
              },
            },
          },
        },
        NotFound: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                success: false,
                error: "Curso no encontrado",
              },
            },
          },
        },
        InternalServerError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ApiResponse",
              },
              example: {
                success: false,
                error: "Error interno del servidor",
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const specs = swaggerJsdoc(options);
