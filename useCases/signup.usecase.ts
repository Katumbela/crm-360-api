import { UserEntity } from "../entities";
import UserSignUpRepository from "../repositories/userSignUp.repository";

class SignUpUseCase {
  constructor(private SignUpDataRepository: UserSignUpRepository) {}

  async signUp(
    email: string,
    password: string,
    name: string,
    company_name: string,
    website: string,
    address: string,
    team: string,
    city: string,
    country: string,
    plan: "Free" | "Basic" | "Premium",
    online_selling: "no" | "yes"
  ): Promise<UserEntity> {
    // Chama o método signUp do UserRepository para criar o novo usuário
    const newUser = await this.SignUpDataRepository.signUp(
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

    // Retorna o novo usuário criado
    return newUser;
  }
}

export default SignUpUseCase;
