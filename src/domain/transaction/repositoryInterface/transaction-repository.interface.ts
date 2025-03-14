import { Transaction } from "../../../infra/database/typeorm/dt-money/entity/Transaction";

export interface GetTransactionsParams {
  userId: number;
  pagination?: {
    page: number;
    perPage: number;
  };
}

export interface TransactionRepositoryInterface {
  getTransactions(params: GetTransactionsParams): Promise<Transaction>;
}
