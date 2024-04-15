import { UserEntity } from "../entities";

interface UserAuthRepository {
  login(email: string, password: string): Promise<UserEntity>;
}

export default UserAuthRepository;
