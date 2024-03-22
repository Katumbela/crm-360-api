import { UserEntity } from "../entities";
import UserAuthRepository from "../repositories/userAuth.repository";

class AuthenticationUseCase {
  constructor(private userAuthRepository: UserAuthRepository) {}

  async login(email: string, password: string): Promise<UserEntity> {
    return this.userAuthRepository.login(email, password);
  }
}

export default AuthenticationUseCase;
