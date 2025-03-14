import { FastifyInstance } from "fastify";
import * as AuthRoutes from "./auth.routes";
import * as TransactionRoutes from "./transaction.routes";

export const register = (fasify: FastifyInstance) => {
  fasify.register((instance, _, done) => {
    AuthRoutes.configure(instance);
    TransactionRoutes.configure(instance);
    done();
  });
};
