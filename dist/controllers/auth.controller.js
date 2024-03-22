"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const firebase_user_repository_1 = require("../repositories/firebase.user.repository");
const auth_usecase_1 = require("../useCases/auth.usecase");
const userRepository = new firebase_user_repository_1.default();
const authenticationUseCase = new auth_usecase_1.default(userRepository);
async function login(req, res) {
    const { email, password } = req.body;
    try {
        const user = await authenticationUseCase.login(email, password);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.login = login;
