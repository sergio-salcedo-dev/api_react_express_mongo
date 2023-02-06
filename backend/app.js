import app from "./server.mjs";

const PORT = 80;

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
