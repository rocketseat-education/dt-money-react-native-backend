import { TransactionRepository } from "../../../infra/database/typeorm/dt-money/repositories/transaction.repository";
import {
  GetTransactionsParams,
  TransactionRepositoryInterface,
} from "../repositoryInterface/transaction-repository.interface";

export class GetTransactionsUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(params: GetTransactionsParams) {
    const transactions = await this.transactionRepository.getTransactions(
      params
    );
    return transactions;
  }
}
