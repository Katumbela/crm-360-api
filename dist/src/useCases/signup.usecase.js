"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignUpUseCase {
    constructor(SignUpDataRepository) {
        this.SignUpDataRepository = SignUpDataRepository;
    }
    async signUp(email, password, name, company_name, website, address, team, city, country, plan, online_selling) {
        // Chama o método signUp do UserRepository para criar o novo usuário
        const newUser = await this.SignUpDataRepository.signUp(email, password, name, company_name, website, address, team, city, country, plan, online_selling);
        // Retorna o novo usuário criado
        return newUser;
    }
}
exports.default = SignUpUseCase;
