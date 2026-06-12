import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log(req.method);
  res.end("welcome mf");
});

export default app;
