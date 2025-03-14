import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteTransactionUseCase } from "../../../../domain/transaction/use-cases/delete-transaction.use-case";

export class DeleteTransactionController {
  private deleteTransactionUseCase: DeleteTransactionUseCase;

  constructor() {
    this.deleteTransactionUseCase = new DeleteTransactionUseCase();
  }

  execute = async (
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply
  ) => {
    const userId = request.user.id;
    const id = Number(request.params.id);

    const transaction = await this.deleteTransactionUseCase.execute({
      id,
      userId,
    });

    reply.send(transaction);
  };
}
