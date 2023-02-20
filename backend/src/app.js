import app from "./server.mjs";
import bodyParser from "body-parser";
import { ROUTE_GOAL, ROUTE_GOALS, ROUTE_HOME } from "./routes.js";
import { deleteGoal, getGoal, getGoals, insertGoal } from "./services/goals.js";
import { setHeaders } from "./services/headers.js";
import { getWelcome } from "./services/home.js";
import { connectToDatabase } from "./services/databaseConnection.js";

// parse application/json
app.use(bodyParser.json());
app.use(setHeaders());

app.get(ROUTE_HOME, getWelcome());
app.get(ROUTE_GOALS, getGoals);
app.get(`${ROUTE_GOAL}/:id`, getGoal);

app.post(ROUTE_GOAL, insertGoal);

app.delete(`${ROUTE_GOAL}/:id`, deleteGoal);

connectToDatabase();
