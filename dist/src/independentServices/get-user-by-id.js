"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserById = void 0;
const firebase_1 = require("../firebase");
async function GetUserById(req, res) {
    try {
        // Recupere o ID do parâmetro da rota
        const userId = req.params.id;
        // Busque o usuário no Firebase Firestore usando o ID fornecido
        const userDoc = await firebase_1.firestore.collection('users').doc(userId).get();
        // Verifique se o usuário foi encontrado
        if (!userDoc.exists) {
            // Se o usuário não existir, retorne um erro 404
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        // Obtenha os dados do usuário do documento
        const userData = userDoc.data();
        // Retorna os dados do usuário encontrado
        res.json(userData);
    }
    catch (error) {
        // Se ocorrer um erro, retorne um erro 500 com uma mensagem de erro
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
}
exports.GetUserById = GetUserById;
