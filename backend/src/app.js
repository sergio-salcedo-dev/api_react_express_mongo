import app from "./server.mjs";
import Logger from "./services/Logger.js";

const PORT = 80;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
