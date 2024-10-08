import express from "express";
import { Router, Request, Response } from "express";
import { login } from "./controllers";
import { signUpUser } from "./controllers/signup.controller";
import cors from "cors"; // Importe o módulo 'cors'
import { GetUserById } from "./independentServices/get-user-by-id";
import "dotenv/config";
import { MonitorBrandMentions } from "./controllers/monitoring.brand.controller";
import { getGMentions } from "./controllers/monitoring.brand.ddg.controller";
import { getYoutubeVideos } from "./controllers/monitoring.yt.controller";

const app = express();

const route = Router();

app.use(express.json());

app.use(
  cors({
    origin: "*", // Permitir solicitações de todas as origens, você pode restringir isso para as origens específicas que deseja permitir
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos na solicitação
  })
);

route.post("/login", login);

route.post("/signup", signUpUser);

route.get("/monitoring", MonitorBrandMentions);

route.get("/yt", getYoutubeVideos);

route.get("/google", getGMentions);

route.get("/user/:id", GetUserById);

route.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "Welcome to the CRM API, Its already alive !!! \n Signup in the main platform to get Started",
  });
});

app.use(route);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
); // Corrija a função de callback do método listen
