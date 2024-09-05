export const orderUrls = {
  list: (queryString: string) => `/orders/?${queryString}`, // GET
  export: (queryString: string) => `/orders/csv/?${queryString}`, // GET
};
