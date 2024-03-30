"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
class FirebaseUserRepository {
    async login(email, password) {
        try {
            const userCredential = await firebase_1.auth.signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            if (!user) {
                throw new Error("User authentication failed");
            }
            // Buscar os dados do usuário no Firestore usando o ID de usuário
            const userDoc = await firebase_1.firestore.collection("users").doc(user.uid).get();
            if (!userDoc.exists) {
                throw new Error("User data not found");
            }
            // Retornar os dados do usuário
            return {
                ...userDoc.data(), // Assume que os dados do usuário estão armazenados no Firestore
            };
        }
        catch (error) {
            throw new Error(error?.toString() || "An unknown error occurred");
        }
    }
}
exports.default = FirebaseUserRepository;
