import { FastifyInstance } from "fastify";
import { CreateTransactionController } from "../controllers/transaction/create-transcation.controller";
import { CheckAuthtenticationMiddleware } from "../middlewares/check-authentication";
import { createTransactionSchema } from "./schemas/transactions/create-transaction";
import { deleteTransactionSchema } from "./schemas/transactions/delete-transaction";
import { DeleteTransactionController } from "../controllers/transaction/delete-transcation.controller";
import { UpdateTransactionController } from "../controllers/transaction/update-transcation.controller";
import { updateTransactionSchema } from "./schemas/transactions/update-transaction";
import { GetTransactionController } from "../controllers/transaction/get-transcation.controller";
import { getTransactionSchema } from "./schemas/transactions/get-transaction";
import { getTransactionDataSchema } from "./schemas/transactions/get-transaction-data";
import { GetTransactionData } from "../controllers/transaction/get-transaction-data.controller";

export const configure = (fastify: FastifyInstance) => {
  const createTransaction = new CreateTransactionController();
  const deleteTransaction = new DeleteTransactionController();
  const updateTransaction = new UpdateTransactionController();
  const getTransaction = new GetTransactionController();
  const getTransactionData = new GetTransactionData();
  const checkAuthenticated = new CheckAuthtenticationMiddleware();

  fastify.route({
    url: "/transaction/categories",
    method: "get",
    handler: getTransactionData.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getTransactionDataSchema,
  });

  fastify.route({
    url: "/transaction",
    method: "get",
    handler: getTransaction.execute,
    preHandler: [checkAuthenticated.execute],
    schema: getTransactionSchema,
  });

  fastify.route({
    url: "/transaction",
    method: "post",
    handler: createTransaction.execute,
    preHandler: [checkAuthenticated.execute],
    schema: createTransactionSchema,
  });

  fastify.route({
    url: "/transaction/:id",
    method: "delete",
    handler: deleteTransaction.execute,
    preHandler: [checkAuthenticated.execute],
    schema: deleteTransactionSchema,
  });

  fastify.route({
    url: "/transaction",
    method: "put",
    handler: updateTransaction.execute,
    preHandler: [checkAuthenticated.execute],
    schema: updateTransactionSchema,
  });
};
