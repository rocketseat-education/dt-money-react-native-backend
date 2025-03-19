import "fastify";
import { User } from "../infra/database/typeorm/dt-money/entities/User";

declare module "fastify" {
  interface FastifyRequest {
    user: User;
  }
}
