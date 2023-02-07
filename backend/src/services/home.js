export const getWelcome = () => {
  const message =
    "Endpoint: <a href='http://localhost/goals'>http://localhost/goals</a>";

  return (request, response) => response.send(message);
};
