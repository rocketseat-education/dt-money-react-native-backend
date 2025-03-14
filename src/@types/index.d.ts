import "fastify";
import { User } from "../infra/database/typeorm/dt-money/entity/User";

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}
