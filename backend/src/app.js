import app from "./server.mjs";
import bodyParser from "body-parser";
import { setHeaders } from "./services/headers.js";
import { connectToDatabase } from "./services/databaseConnection.js";
import api from "./api.js";

// parse application/json
app.use(bodyParser.json());
app.use(setHeaders());

api();
connectToDatabase();
