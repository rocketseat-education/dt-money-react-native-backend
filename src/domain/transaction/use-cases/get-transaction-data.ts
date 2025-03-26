import { Repository } from "typeorm";
import { TransactionType } from "../../../infra/database/typeorm/dt-money/entities/TransactionType";
import { DtMoneyDataSource } from "../../../infra/database/typeorm/dt-money/data-source";
import { TransactionCategory } from "../../../infra/database/typeorm/dt-money/entities/TransactionCategory";
import { DatabaseError } from "../../../shared/errors/database.error";

export class GetTransactionDataUserCase {
  private typesRepository: Repository<TransactionType>;
  private categoryRepository: Repository<TransactionCategory>;

  constructor() {
    this.typesRepository = DtMoneyDataSource.getRepository(TransactionType);
    this.categoryRepository =
      DtMoneyDataSource.getRepository(TransactionCategory);
  }

  async execute(): Promise<{
    types: TransactionType[];
    categories: TransactionCategory[];
  }> {
    try {
      const [types, categories] = await Promise.all([
        this.typesRepository.find({
          select: ["name", "id"],
        }),
        this.categoryRepository.find({
          select: ["name", "id"],
        }),
      ]);

      return {
        types,
        categories,
      };
    } catch (error) {
      throw new DatabaseError("Falha ao buscar dados das transações");
    }
  }
}
