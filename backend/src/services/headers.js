export const setHeaders = () => {
  return (request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, DELETE, OPTIONS"
    );
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  };
};
