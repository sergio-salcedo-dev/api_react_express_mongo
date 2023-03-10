import app from "./server.mjs";
import { ROUTE_GOAL, ROUTE_GOALS, ROUTE_HOME } from "./routes.js";
import { getWelcome } from "./services/home.js";
import {
  deleteGoal,
  deleteGoals,
  getGoal,
  getGoals,
  insertGoal,
  updateGoal,
} from "./services/goals.js";

const api = () => {
  app.get(ROUTE_HOME, getWelcome());
  app.get(ROUTE_GOALS, getGoals);
  app.get(`${ROUTE_GOAL}/:id`, getGoal);

  app.post(ROUTE_GOAL, insertGoal);

  app.put(`${ROUTE_GOAL}/:id`, updateGoal);

  app.delete(`${ROUTE_GOAL}/:id`, deleteGoal);
  app.delete(ROUTE_GOALS, deleteGoals);
};

export default api;
