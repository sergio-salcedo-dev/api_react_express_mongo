import app from "./server.mjs";
import Logger from "./services/logger.js";
import { ROUTE_GOALS, ROUTE_HOME } from "./routes.js";
import { getGoals } from "./services/goals.js";
import { setHeaders } from "./services/headers.js";
import { getWelcome } from "./services/home.js";

const PORT = process.env.PORT;

app.get(ROUTE_HOME, getWelcome());

app.use(setHeaders());

app.get(ROUTE_GOALS, getGoals);

app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
