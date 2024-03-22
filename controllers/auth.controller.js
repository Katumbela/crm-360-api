"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const firebase_userAuth_repository_1 = __importDefault(require("../repositories/firebase.userAuth.repository"));
const auth_usecase_1 = __importDefault(require("../useCases/auth.usecase"));
const userRepository = new firebase_userAuth_repository_1.default();
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
