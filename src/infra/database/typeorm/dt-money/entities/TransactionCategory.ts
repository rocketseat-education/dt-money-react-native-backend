import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("transaction_categories")
export class TransactionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.category)
  transactions?: Transaction[];
}
