import { Repository } from "typeorm";
import { DtMoneyDataSource } from "../../../infra/database/typeorm/dt-money/data-source";
import { TransactionCategory } from "../../../infra/database/typeorm/dt-money/entities/TransactionCategory";
import { DatabaseError } from "../../../shared/errors/database.error";

export class GetTransactionDataUserCase {
  private categoryRepository: Repository<TransactionCategory>;

  constructor() {
    this.categoryRepository =
      DtMoneyDataSource.getRepository(TransactionCategory);
  }

  async execute(): Promise<TransactionCategory[]> {
    try {
      const categories = await this.categoryRepository.find({
        select: ["name", "id"],
      });

      return categories;
    } catch (error) {
      throw new DatabaseError("Falha ao buscar dados das transações");
    }
  }
}
