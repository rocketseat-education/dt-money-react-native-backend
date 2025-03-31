import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const successResponse = S.array().items(S.ref("Category#"));

export const getTransactionDataSchema: FastifySchema = {
  tags: ["Transaction"],
  security: [{ bearerAuth: [] }],
  response: {
    200: successResponse,
    401: {
      $ref: "Unauthorized#",
    },
    500: {
      $ref: "ServerError#",
    },
  },
};
