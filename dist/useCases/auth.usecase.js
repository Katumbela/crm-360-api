"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthenticationUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        return this.userRepository.login(email, password);
    }
}
exports.default = AuthenticationUseCase;
