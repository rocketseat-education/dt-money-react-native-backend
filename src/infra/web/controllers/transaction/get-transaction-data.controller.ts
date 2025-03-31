import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionDataUserCase } from "../../../../domain/transaction/use-cases/get-transaction-data";

export class GetTransactionData {
  private useCase: GetTransactionDataUserCase;

  constructor() {
    this.useCase = new GetTransactionDataUserCase();
  }

  execute = async (req: FastifyRequest, reply: FastifyReply) => {
    const data = await this.useCase.execute();
    return reply.send(data);
  };
}
