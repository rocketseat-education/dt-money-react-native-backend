import { TransactionRepository } from "../../../infra/database/typeorm/dt-money/repositories/transaction.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";
import { UnauthenticatedError } from "../../../shared/errors/unauthenticated.error";
import { TransactionRepositoryInterface } from "../repositoryInterface/transaction-repository.interface";

export class DeleteTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute({ id, userId }: { id: number; userId: number }) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) {
      throw new NotFoundError(`Transação com ID ${id} não encontrada!`);
    }

    if (transaction.userId !== userId) {
      throw new UnauthenticatedError(
        "Sem autorização para deletar esta transação!"
      );
    }

    await this.transactionRepository.deleteTransaction(id);
  }
}
