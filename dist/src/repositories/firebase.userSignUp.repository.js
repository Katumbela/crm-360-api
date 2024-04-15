"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
const firebase_1 = require("../firebase");
class FirebaseUserSignUpRepository {
    async signUp(email, password, name, company_name, website, address, team, city, country, plan, online_selling) {
        try {
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
                    searches: (0, entities_1.getLimitsForPlan)(plan)
                }
            };
            // Salva os dados do usuário no Firestore
            await firebase_1.firestore.collection("users").doc(user.uid).set(userData);
            await firebase_1.firestore.collection("business").doc(userData.id.substring(0, 4) + "_" + userData.company_name).set(businessData);
            return userData;
            // Retorna os dados do usuário recém-criado e indicação de sucesso
        }
        catch (error) {
            // Retorna um indicador de falha e a mensagem de erro
            throw new Error(error?.toString() + email || "An unknown error occurred");
        }
    }
}
exports.default = FirebaseUserSignUpRepository;
