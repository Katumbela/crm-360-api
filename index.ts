import express from "express";
import { login } from "./controllers";
const app = express();

app.use(express.json());

app.post("/login", login);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
