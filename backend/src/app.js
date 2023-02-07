import app from "./server.mjs";
import bodyParser from "body-parser";
import Logger from "./services/logger.js";
import { ROUTE_GOALS, ROUTE_HOME } from "./routes.js";
import { getGoals, insertGoal } from "./services/goals.js";
import { setHeaders } from "./services/headers.js";
import { getWelcome } from "./services/home.js";

const PORT = process.env.PORT;

app.get(ROUTE_HOME, getWelcome());

// parse application/json
app.use(bodyParser.json());

app.use(setHeaders());

app.get(ROUTE_GOALS, getGoals);

app.post(ROUTE_GOALS, insertGoal);

app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
