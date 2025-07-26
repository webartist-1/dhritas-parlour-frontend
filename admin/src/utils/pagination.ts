export const paginate = <T,>(data: T[], page: number, pageSize: number) =>
data.slice((page - 1) * pageSize, page * pageSize);