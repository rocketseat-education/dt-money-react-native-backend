import { Repository } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { DtMoneyDataSource } from "../data-source";
import {
  GetTransactionsParams,
  TransactionRepositoryInterface,
} from "../../../../../domain/transaction/use-cases/get-transaction";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { Paginated } from "../../../../../interfaces/paginated";

export class TransactionRepository implements TransactionRepositoryInterface {
  private userRepository: Repository<Transaction>;

  constructor() {
    this.userRepository = DtMoneyDataSource.getRepository(Transaction);
  }

  async getTransactions({
    userId,
    pagination,
    filters,
    searchText,
    sort,
  }: GetTransactionsParams): Promise<Paginated<Transaction>> {
    try {
      let totalRows = 0;
      let totalPages = 0;
      let page = 0;
      let perPage = 0;
      let transactions: Transaction[] = [];

      const query = this.userRepository.createQueryBuilder("transaction");

      if (sort?.id) {
        query.addOrderBy(
          "transaction.id",
          sort.id.toUpperCase() as "ASC" | "DESC"
        );
      }

      query.where("transaction.userId = :userId", { userId });

      if (searchText) {
        query.andWhere("transaction.value LIKE :searchText", {
          searchText: `%${searchText}%`,
        });
      }

      if (filters?.from && !filters.to) {
        query.andWhere("transaction.createdAt >= :from", {
          from: filters.from,
        });
      }

      if (filters?.from && !filters.to) {
        query.andWhere("transaction.createdAt >= :from", {
          from: filters.from,
        });
      }

      if (filters?.to && !filters.from) {
        query.andWhere("transaction.createdAt >= :to", { to: filters.to });
      }

      if (pagination) {
        const skip = (pagination.page - 1) * pagination.perPage;
        const take = pagination.perPage;

        query.skip(skip).take(take);

        const result = await query.getManyAndCount();

        transactions = result[0];
        totalRows = result[1];
        totalPages = Math.ceil(totalRows / pagination.perPage);
        page = pagination.page;
        perPage = pagination.perPage;
      } else {
        transactions = await query.getMany();
      }

      return {
        data: transactions,
        totalRows,
        totalPages,
        page,
        perPage,
      };
    } catch (error) {
      throw new DatabaseError("Falha ao buscar transações finançeiras", error);
    }
  }
}
