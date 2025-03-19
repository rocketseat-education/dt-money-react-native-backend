import { DataSource } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { TransactionCategory } from "../entities/TransactionCategory";
import { TransactionType } from "../entities/TransactionType";

export class SeederService {
  constructor(private dataSource: DataSource) {}

  async run() {
    await this.seedTypes();
    await this.seedCategories();
  }

  private async seedTypes() {
    const typeRepository = this.dataSource.getRepository(TransactionType);

    const types = [
      { id: 1, name: "Entrada" },
      { id: 2, name: "Saída" },
    ];

    for (const type of types) {
      const exists = await typeRepository.findOne({ where: { id: type.id } });
      if (!exists) {
        await typeRepository.save(type);
      }
    }
  }

  private async seedCategories() {
    const categoryRepository =
      this.dataSource.getRepository(TransactionCategory);

    const categories = [
      { id: 1, name: "Casa" },
      { id: 2, name: "Academia" },
      { id: 3, name: "Saúde" },
      { id: 4, name: "Aluguel" },
      { id: 5, name: "Trabalho" },
      { id: 6, name: "Freelance" },
      { id: 7, name: "Emergência" },
      { id: 8, name: "Reforma" },
    ];

    for (const category of categories) {
      const exists = await categoryRepository.findOne({
        where: { id: category.id },
      });
      if (!exists) {
        await categoryRepository.save(category);
      }
    }
  }
}
