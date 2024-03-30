import { Request, Response } from "express";
import FirebaseUserSignUpRepository from "../repositories/firebase.userSignUp.repository";
import SignUpUseCase from "../useCases/signup.usecase";
import UserSignUpRepository from "../repositories/userSignUp.repository"; // Importe o tipo correto
import { auth, firestore } from "../firebase";
import { BusinessData, UserEntity, getLimitsForPlan } from "../entities";

const signUpRepository: UserSignUpRepository =
  new FirebaseUserSignUpRepository(); // Declare a instância como do tipo correto
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
      email: "teste" + email,
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

    const businessData: BusinessData = {
      collaborators: [],
      limits: {
        email: getLimitsForPlan(plan),
        searches: getLimitsForPlan(plan),
      },
    };

    // Salva os dados do usuário no Firestore
    await firestore.collection("users").doc(user.uid).set(userData);
    await firestore
      .collection("business")
      .doc(userData.id.substring(0, 4) + "_" + userData.company_name)
      .set(businessData);

    res.status(201).json({
      message: "User registered successfully",
      user: userData,
    });
  } catch (error) {
    // Retorna um indicador de falha e a mensagem de erro
    console.error("Error:", error);
    res.status(500).json({
      error: "An error occurred while registering the user",
    });
  }
}

export { signUp };
