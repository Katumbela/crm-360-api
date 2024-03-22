import express from 'express';
import { Router, Request, Response } from 'express';
import { login } from './controllers';
import { signUp } from './controllers/signup.controller';
import cors from 'cors'; // Importe o módulo 'cors'

const app = express();

const route = Router();

app.use(express.json());

app.use(cors()); // Use o middleware de CORS em todas as rotas

route.post("/login", login);

route.post("/signup", signUp);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the CRM API, Its already alive !!!' });
});

app.use(route);

const PORT = 3035;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Corrija a função de callback do método listen
