import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/event_handler", (req, res) => {
  const payload = JSON.parse(req.body.payload);

  if (req.headers["x-github-event"] === "pull_request") {
    const action = payload.action;
    if (action === "merged") {
      res.send("merged, start deploy");
    }

    res.send("pull request event");
  }

  res.send("hello event handler");
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});
