import app from "./server.mjs";
import { ROUTE_GOAL, ROUTE_GOALS, ROUTE_HOME } from "./routes.js";
import { getWelcome } from "./services/home.js";
import { deleteGoal, getGoal, getGoals, insertGoal } from "./services/goals.js";

const api = () => {
  app.get(ROUTE_HOME, getWelcome());
  app.get(ROUTE_GOALS, getGoals);
  app.get(`${ROUTE_GOAL}/:id`, getGoal);

  app.post(ROUTE_GOAL, insertGoal);

  app.delete(`${ROUTE_GOAL}/:id`, deleteGoal);
};

export default api;
