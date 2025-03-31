import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { TransactionType } from "./TransactionType";
import { User } from "./User";
import { TransactionCategory } from "./TransactionCategory";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "description", type: "varchar", nullable: true })
  description?: string;

  @Column({ name: "type_id", type: "int", nullable: false })
  typeId: number;

  @Column({ name: "category_id", type: "int", nullable: false })
  categoryId: number;

  @Column({ name: "user_id", type: "int", nullable: false })
  userId: number;

  @Column({ name: "value", type: "int", nullable: false })
  value: number;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: "deleted_at", type: "datetime", nullable: true })
  deletedAt: Date | null;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.transactions
  )
  @JoinColumn({ name: "type_id", referencedColumnName: "id" })
  type: TransactionType;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user?: User;

  @ManyToOne(() => TransactionCategory, (category) => category.transactions)
  @JoinColumn({ name: "category_id", referencedColumnName: "id" })
  category: TransactionCategory;
}
