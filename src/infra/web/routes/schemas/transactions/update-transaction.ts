import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const body = S.object()
  .prop("id", S.number().required())
  .prop("typeId", S.number())
  .prop("categoryId", S.number())
  .prop("value", S.number())
  .prop("description", S.string());

export const updateTransactionSchema: FastifySchema = {
  tags: ["Transaction"],
  body,
  security: [{ bearerAuth: [] }],
  response: {
    204: {
      type: "null",
    },
    401: {
      $ref: "Unauthorized#",
    },
    422: {
      $ref: "UnprocessableEntity#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
