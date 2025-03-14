import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const params = S.object().prop("id", S.number().required());

export const deleteTransactionSchema: FastifySchema = {
  tags: ["Transaction"],
  params,
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
