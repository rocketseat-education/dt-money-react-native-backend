import {
  TransactionRepositoryInterface,
  UpdateTransactionParams,
} from "../repositoryInterface/transaction-repository.interface";
import { Transaction } from "../../../infra/database/typeorm/dt-money/entities/Transaction";
import { TransactionRepository } from "../../../infra/database/typeorm/dt-money/repositories/transaction.repository";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export interface UpdateTransactionUseCaseParams
  extends UpdateTransactionParams {
  id: number;
}

export class UpdateTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(params: UpdateTransactionUseCaseParams): Promise<void> {
    const transaction = await this.transactionRepository.findById(params.id);

    if (!transaction) {
      throw new NotFoundError("Transação não encontrada");
    }

    await this.transactionRepository.updateTransaction(params);
  }
}
