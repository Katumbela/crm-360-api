"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationUseCase {
    constructor(userAuthRepository) {
        this.userAuthRepository = userAuthRepository;
    }
    async login(email, password) {
        return this.userAuthRepository.login(email, password);
    }
}
exports.default = AuthenticationUseCase;
