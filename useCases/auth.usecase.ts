import { UserEntity } from "../entities";
import UserRepository from "../repositories/user.repository";


class AuthenticationUseCase {
    constructor(private userRepository: UserRepository) {}

    async login(email: string, password: string): Promise<UserEntity> {
        return this.userRepository.login(email, password);
    }
}

export default AuthenticationUseCase;
