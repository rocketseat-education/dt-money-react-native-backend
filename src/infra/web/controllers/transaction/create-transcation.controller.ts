import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTransactionUseCase } from "../../../../domain/transaction/use-cases/create-transaction.use-case";
import { CreateTranscationParams } from "../../../../domain/transaction/repositoryInterface/transaction-repository.interface";

export class CreateTransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;

  constructor() {
    this.createTransactionUseCase = new CreateTransactionUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: CreateTranscationParams }>,
    reply: FastifyReply
  ) => {
    const body = request.body;
    const userId = request.user.id;
    const transaction = await this.createTransactionUseCase.execute({
      ...body,
      userId,
    });

    reply.status(200).send(transaction);
  };
}
