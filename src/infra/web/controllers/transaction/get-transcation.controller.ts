import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsParams } from "../../../../domain/transaction/repositoryInterface/transaction-repository.interface";
import { GetTransactionsUseCase } from "../../../../domain/transaction/use-cases/get-transaction.use-case";
import { OrderDirection } from "../../../../interfaces/order-direction";

interface Request {
  Querystring: {
    page?: number;
    perPage?: number;
    from?: string;
    to?: string;
    orderId?: OrderDirection;
    searchText?: string;
    categoryId?: number;
    typeId?: number;
  };
}

export class GetTransactionController {
  private getTransactionUseCase: GetTransactionsUseCase;

  constructor() {
    this.getTransactionUseCase = new GetTransactionsUseCase();
  }

  execute = async (request: FastifyRequest<Request>, reply: FastifyReply) => {
    const { from, orderId, page, perPage, to, searchText, categoryId, typeId } =
      request.query;

    const userId = request.user.id;

    const params: GetTransactionsParams = {
      filters: {
        from: from ? new Date(from) : undefined,
        to: to ? new Date(to) : undefined,
        categoryId,
        typeId,
      },
      sort: {
        id: orderId,
      },
      userId,
      searchText: searchText ?? undefined,
    };
    console.log({ page, perPage });
    if (page && perPage) {
      params.pagination = {
        page,
        perPage,
      };
    }
    console.log(params);
    const transaction = await this.getTransactionUseCase.execute(params);

    reply.send(transaction);
  };
}
