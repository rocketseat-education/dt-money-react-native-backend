import { FastifySchema } from "fastify";
import S from "fluent-json-schema";

const successResponse = S.object()
  .prop("data", S.array().items(S.ref("Transaction#")))
  .prop("totalRows", S.number())
  .prop("totalPages", S.number())
  .prop("page", S.number())
  .prop("perPage", S.number())
  .prop("totalTransactions", S.ref("TotalTransactions#"));

const querystring = S.object()
  .prop("page", S.number().minimum(1))
  .prop("perPage", S.number().minimum(1))
  .prop("searchText", S.string())
  .prop("typeId", S.number().minimum(1))
  .prop("categoryIds", S.array().items(S.number().minimum(1)))
  .prop("from", S.string().format("date-time"))
  .prop("to", S.string().format("date-time"))
  .prop("orderId", S.ref("OrderDirection#"));

export const getTransactionSchema: FastifySchema = {
  tags: ["Transaction"],
  querystring,
  security: [{ bearerAuth: [] }],
  response: {
    200: successResponse,
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
