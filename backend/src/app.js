import app from "./server.mjs";
import bodyParser from "body-parser";
import { setHeaders } from "./services/headers.js";
import { connectToDatabase } from "./services/databaseConnection.js";
import api from "./api.js";
import morgan from "morgan";
import { getAccessLogStream } from "./services/accessLogStream.js";

const accessLogStream = await getAccessLogStream();

app.use(morgan("combined", { stream: accessLogStream }));
// parse application/json
app.use(bodyParser.json());
app.use(setHeaders());

api();
connectToDatabase();
