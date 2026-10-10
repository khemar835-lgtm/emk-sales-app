const express = require("express");
const app = express();

app.use(express.json({ limit: "10mb" }));

let state = {};
let revision = 0;

app.get("/", (req, res) => {
  res.send("C&E Sales Manager Server is running!");
});

app.get("/api/state", (req, res) => {
  res.json({ state, revision });
});

app.post("/api/state", (req, res) => {
  if (!req.body || !req.body.state) {
    return res.status(400).json({ error: "Missing state" });
  }

  state = req.body.state;
  revision++;

  res.json({ success: true, revision });
});

const PORT = process.env.PORT || 3000;
