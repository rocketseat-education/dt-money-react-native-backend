import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./Transaction";

@Entity("transaction_types")
export class TransactionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name", type: "varchar", nullable: false })
  name: string;

  @OneToMany(() => Transaction, (transaction) => transaction.type)
  transactions?: Transaction[];
}
