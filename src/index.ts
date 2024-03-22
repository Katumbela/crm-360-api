import express from 'express';
import { Router, Request, Response } from 'express';
import { login } from './controllers';
import { signUp } from './controllers/signup.controller';
import cors from 'cors'; // Importe o módulo 'cors'
import { GetUserById } from './independentServices/get-user-by-id';

const app = express();

const route = Router();

app.use(express.json());

app.use(cors({
  origin: '*', // Permitir solicitações de todas as origens, você pode restringir isso para as origens específicas que deseja permitir
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos na solicitação
}));

route.post("/login", login);

route.post("/signup", signUp);Í

route.get("/user/:id", GetUserById);

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the CRM API, Its already alive !!!' });
});

app.use(route);

const PORT = 3035;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Corrija a função de callback do método listen
