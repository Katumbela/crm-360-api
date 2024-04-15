import { Request, Response } from "express";
import FirebaseUserRepository from "../repositories/firebase.userAuth.repository";
import AuthenticationUseCase from "../useCases/auth.usecase";


const userRepository = new FirebaseUserRepository();
const authenticationUseCase = new AuthenticationUseCase(userRepository);

async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    const user = await authenticationUseCase.login(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export { login };
