import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateTransactionParams } from "../../../../domain/transaction/repositoryInterface/transaction-repository.interface";
import { UpdateTransactionUseCase } from "../../../../domain/transaction/use-cases/update-transaction.use-case";

export class UpdateTransactionController {
  private updateTransactionUseCase: UpdateTransactionUseCase;

  constructor() {
    this.updateTransactionUseCase = new UpdateTransactionUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Body: UpdateTransactionParams }>,
    reply: FastifyReply
  ) => {
    const body = request.body;
    const userId = request.user.id;
    await this.updateTransactionUseCase.execute({
      ...body,
      userId,
    });

    reply.status(204).send();
  };
}
