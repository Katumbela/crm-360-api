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
            // Exemplo de uso do enum e das interfaces
            const userData = {
                id: user.uid,
                email: email,
                name: name || "",
                company_name: company_name || "",
                website: website || "",
                password: password,
                address: address || "",
                team: team || "",
                phone: 0,
                city: city || "",
                country: country || "",
                plan: plan, // Defina o plano conforme necessário
                online_selling: online_selling || "no",
                datas: {
                    limits: {
                        email: (0, entities_1.getLimitsForPlan)(plan), // Obtém os limites com base no plano
                        searches: {
                            daily: 50, // Exemplo: limite diário de pesquisas
                            monthly: 1000, // Exemplo: limite mensal de pesquisas
                        },
                    },
                    collaborators: [], // Exemplo: lista de colaboradores
                },
            };
            // Salva os dados do usuário no Firestore
            await firebase_1.firestore.collection("users").doc(user.uid).set(userData);
            // Retorna os dados do usuário recém-criado com o nome da coleção
            return { ...userData };
        }
        catch (error) {
            throw new Error(error?.toString() + email || "An unknown error occurred");
        }
    }
}
exports.default = FirebaseUserSignUpRepository;
