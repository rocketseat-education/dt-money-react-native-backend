import { User } from "../../../infra/database/typeorm/dt-money/entity/User";

export interface AuthReponse {
  user: User;
  token: string;
}
