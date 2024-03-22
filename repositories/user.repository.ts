import { UserEntity } from "../entities";

interface UserRepository {
  login(email: string, password: string): Promise<UserEntity>;
}

export default UserRepository;
