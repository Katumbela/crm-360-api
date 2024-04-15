"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = void 0;
const firebase_userSignUp_repository_1 = __importDefault(require("../repositories/firebase.userSignUp.repository"));
const signup_usecase_1 = __importDefault(require("../useCases/signup.usecase"));
const firebase_1 = require("../firebase");
const entities_1 = require("../entities");
const signUpRepository = new firebase_userSignUp_repository_1.default(); // Declare a instância como do tipo correto
const signUpUseCase = new signup_usecase_1.default(signUpRepository);
async function signUpUser(req, res) {
    const { team, email, password, name, website, address, country, company_name, city, plan, online_selling, } = req.body;
    try {
        // Verifica se o usuário já existe
        // Cria um novo usuário no Firebase Authentication
        const userCredential = await firebase_1.auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (!user) {
            throw new Error("User authentication failed");
        }
        const userData = {
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
        const businessData = {
            collaborators: [],
            limits: {
                email: (0, entities_1.getLimitsForPlan)(plan),
                searches: (0, entities_1.getLimitsForPlan)(plan),
            },
        };
        // Salva os dados do usuário no Firestore
        await firebase_1.firestore
            .collection("users")
            .doc(userData.id.substring(0, 4) + "_" + userData.company_name)
            .set(userData);
        await firebase_1.firestore
            .collection("business")
            .doc(userData.id.substring(0, 4) + "_" + userData.company_name)
            .set(businessData);
        res.status(201).json({
            message: "User registered successfully",
            user: userData,
        });
    }
    catch (error) {
        // Verifica o tipo de erro e envia uma resposta apropriada
        if (error.code === "auth/email-already-in-use") {
            res.status(400).json({
                error: "Email address is already in use",
            });
        }
        else {
            console.error("Error:", error);
            res.status(500).json({
                error: "An error occurred while registering the user",
            });
        }
    }
}
exports.signUpUser = signUpUser;
