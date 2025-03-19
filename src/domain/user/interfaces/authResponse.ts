import { User } from "../../../infra/database/typeorm/dt-money/entities/User";

export interface AuthReponse {
  user: User;
  token: string;
}
