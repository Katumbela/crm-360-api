"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitsForPlan = void 0;
// Função para obter os limites com base no plano
function getLimitsForPlan(plan) {
    switch (plan) {
        case "Free":
            return { daily: 50, monthly: 500 };
        case "Basic":
            return { daily: 100, monthly: 1000 };
        case "Premium":
            return { daily: 500, monthly: 5000 };
        default:
            throw new Error("Invalid plan type");
    }
}
exports.getLimitsForPlan = getLimitsForPlan;
