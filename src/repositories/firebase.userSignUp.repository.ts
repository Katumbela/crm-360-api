import { UserEntity } from "../entities";
import firebase from "firebase/app";
import { auth, firestore } from "../firebase";
import UserSignUpRepository from "./userSignUp.repository";

class FirebaseUserSignUpRepository  implements UserSignUpRepository {
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
    try {
      // Cria um novo usuário no Firebase Authentication
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;

      if (!user) {
        throw new Error("User authentication failed");
      }

      const userData: UserEntity = {
        id: user.uid,
        email: email,
        name: name || "", // Adiciona o nome do usuário
        company_name: company_name || "", // Adiciona o nome da empresa
        website: website || "", // Adiciona o website
        password: password, // Adiciona a senha
        address: address || "", // Adiciona o endereço
        team: team || "", // Adiciona o time
        phone: 0,
        city: city || "", // Adiciona a cidade
        country: country || "", // Adiciona o país
        plan: plan || "Free", // Adiciona o plano
        online_selling: online_selling || "no", // Adiciona a opção de venda online
      };

      // Salva os dados do usuário no Firestore
      await firestore.collection("users").doc(user.uid).set(userData);
      return userData ;
      // Retorna os dados do usuário recém-criado e indicação de sucesso
    } catch (error) {
      // Retorna um indicador de falha e a mensagem de erro
      throw new Error(error?.toString() + email || "An unknown error occurred");
    }
  }
}

export default FirebaseUserSignUpRepository;
