const PaginationUtils = {
  skip: (limit: number, page: number) => (page > 0 ? page - 1 : page) * limit,

  paginationQueryValidator: (query: object) => {
    let limit = query["limit"] || 10;
    let page = query["page"] || 1;

    if (typeof limit !== "number") limit = 10;
    if (typeof page !== "number") page = 1;

    return { limit, page };
  },
};

export default PaginationUtils;
