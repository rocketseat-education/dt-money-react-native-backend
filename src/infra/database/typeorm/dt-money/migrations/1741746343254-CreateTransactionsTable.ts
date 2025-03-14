import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTransactionsTable1741746343254
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "type_id",
            type: "int",
            isNullable: false,
            enum: ["1 - Entrada", "2 - Saída"],
          },
          {
            name: "category_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "value",
            type: "int",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "datatime",
            isNullable: false,
            default: "now()",
          },
          {
            name: "updated_at",
            type: "datatime",
            isNullable: true,
          },
          {
            name: "deleted_at",
            type: "datatime",
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FK_transaction_category_id",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "transaction_categories",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FK_transaction_type_id",
        columnNames: ["type_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "transaction_types",
      })
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FK_transaction_user_id",
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      "transactions",
      "FK_transaction_category_id"
    );
    await queryRunner.dropForeignKey("transactions", "FK_transaction_type_id");
    await queryRunner.dropForeignKey("transactions", "FK_transaction_user_id");
    await queryRunner.dropTable("transactions");
  }
}
