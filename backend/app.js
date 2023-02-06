import app from "./server.mjs";

const PORT = 80;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
