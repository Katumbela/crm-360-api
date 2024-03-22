"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
                email: email,
                name: name || "", // Adiciona o nome do usuário
                company_name: company_name || "", // Adiciona o nome da empresa
                website: website || "", // Adiciona o website
                password: password, // Adiciona a senha
                address: address || "", // Adiciona o endereço
                team: team || "", // Adiciona o time
                city: city || "", // Adiciona a cidade
                country: country || "", // Adiciona o país
                plan: plan || "Free", // Adiciona o plano
                online_selling: online_selling || "no", // Adiciona a opção de venda online
            };
            // Salva os dados do usuário no Firestore
            await firebase_1.firestore.collection("users").doc(user.uid).set(userData);
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
