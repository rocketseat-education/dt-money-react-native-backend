import { User } from "../../../infra/database/typeorm/dt-money/entity/User";

export interface CreateUserParams {
  name: string;
  email: string;
  password: string;
}

export interface UserRepositoryInterface {
  createUser(user: CreateUserParams): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
