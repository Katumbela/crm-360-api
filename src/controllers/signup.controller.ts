import { Request, Response } from "express";
import FirebaseUserSignUpRepository from "../repositories/firebase.userSignUp.repository";
import SignUpUseCase from "../useCases/signup.usecase";
import UserSignUpRepository from "../repositories/userSignUp.repository"; // Importe o tipo correto

const signUpRepository: UserSignUpRepository = new FirebaseUserSignUpRepository(); // Declare a instância como do tipo correto
const signUpUseCase = new SignUpUseCase(signUpRepository);

async function signUp(req: Request, res: Response): Promise<void> {
  const {
    team,
    email,
    password,
    name,
    website,
    address,
    country,
    company_name,
    city,
    plan,
    online_selling,
  } = req.body;

  try {
    const user = await signUpUseCase.signUp(
      email,
      password,
      name,
      company_name,
      website,
      address,
      team,
      city,
      country,
      plan,
      online_selling
    );
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}

export { signUp };
