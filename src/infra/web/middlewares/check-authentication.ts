import { FastifyRequest } from "fastify";
import { AuthTypeormRepository } from "../repositories/auth.repository";
import jwt from 'jsonwebtoken'

export class CheckAuthtenticationMiddleware {
  private authRepository: AuthTypeormRepository;

  constructor() {
    this.authRepository = new AuthTypeormRepository();
  }

  execute = async (request: FastifyRequest) => {
    const authorizationHeader = request.headers?.authorization;

    if(!authorizationHeader) {
      throw new Error("Sem autorização")
    }

    const [, token] = authorizationHeader.split(' ')

    if(!token || token === '') {
      throw new Error("Não possui token")
    }

    const { email } = jwt.verify(token, process.env.APP_SCRETET_KEY)

    try {
      const user = await this.authRepository.findByEmail(email)

      request.user = user
    } catch(error) {
      throw new Error("Falha ao buscar usuário")
    }


  }
}