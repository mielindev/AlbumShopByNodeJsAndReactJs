import dotenv from "dotenv";
import express from "express";
import { AppRoute } from "./AppRoute.js";
dotenv.config();
const app = express();
const port = process?.env?.PORT || 3030;

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
AppRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
