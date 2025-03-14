import { Repository } from "typeorm";
import { Transaction } from "../entity/Transaction";
import { DtMoneyDataSource } from "../data-source";
import {
  GetTransactionsParams,
  TransactionRepositoryInterface,
  UpdateTransactionParams,
} from "../../../../../domain/transaction/repositoryInterface/transaction-repository.interface";
import { DatabaseError } from "../../../../../shared/errors/database.error";
import { Paginated } from "../../../../../interfaces/paginated";
import { NotFoundError } from "../../../../../shared/errors/not-found.error";

export class TransactionRepository implements TransactionRepositoryInterface {
  private transactionRepository: Repository<Transaction>;

  constructor() {
    this.transactionRepository = DtMoneyDataSource.getRepository(Transaction);
  }
  async deleteTransaction(transactionId: number): Promise<void> {
    try {
      await this.transactionRepository.softDelete(transactionId);
    } catch (error) {
      throw new DatabaseError("Falha ao excluir a transação", error);
    }
  }

  async findById(id: number): Promise<Transaction> {
    try {
      const transaction = await this.transactionRepository.findOne({
        where: { id },
      });

      if (!transaction) {
        throw new NotFoundError(`Transação com ID ${id} não encontrada`);
      }

      return transaction;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar a transação por ID", error);
    }
  }

  async updateTransaction(params: UpdateTransactionParams): Promise<void> {
    try {
      await this.transactionRepository.save(params);
    } catch (error) {
      throw new DatabaseError("Falha ao atualizar a transação", error);
    }
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

      const query =
        this.transactionRepository.createQueryBuilder("transaction");

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
