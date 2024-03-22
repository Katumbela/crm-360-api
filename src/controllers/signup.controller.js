"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUp = void 0;
const firebase_userSignUp_repository_1 = __importDefault(require("../repositories/firebase.userSignUp.repository"));
const signup_usecase_1 = __importDefault(require("../useCases/signup.usecase"));
const signUpRepository = new firebase_userSignUp_repository_1.default(); // Declare a instância como do tipo correto
const signUpUseCase = new signup_usecase_1.default(signUpRepository);
async function signUp(req, res) {
    const { team, email, password, name, website, address, country, company_name, city, plan, online_selling, } = req.body;
    try {
        const user = await signUpUseCase.signUp(email, password, name, company_name, website, address, team, city, country, plan, online_selling);
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}
exports.signUp = signUp;
