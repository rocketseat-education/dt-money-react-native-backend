import { Transaction } from "../../../infra/database/typeorm/dt-money/entities/Transaction";
import { TransactionRepository } from "../../../infra/database/typeorm/dt-money/repositories/transaction.repository";
import {
  CreateTranscationParams,
  TransactionRepositoryInterface,
} from "../repositoryInterface/transaction-repository.interface";

export class CreateTransactionUseCase {
  private transactionRepository: TransactionRepositoryInterface;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async execute(params: CreateTranscationParams): Promise<Transaction> {
    const transction = await this.transactionRepository.createTransaction(
      params
    );
    return transction;
  }
}
