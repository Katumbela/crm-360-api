import { UserEntity } from "../entities";

interface UserSignUpRepository {

  signUp(
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
  ): Promise<UserEntity>;

}

export default UserSignUpRepository;
