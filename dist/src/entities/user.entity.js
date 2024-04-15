"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitsForPlan = exports.PlanType = void 0;
var PlanType;
(function (PlanType) {
    PlanType["Free"] = "Free";
    PlanType["Basic"] = "Basic";
    PlanType["Premium"] = "Premium";
})(PlanType || (exports.PlanType = PlanType = {}));
// Função para obter os limites com base no plano
function getLimitsForPlan(plan) {
    switch (plan) {
        case PlanType.Free:
            return { daily: 50, monthly: 500 };
        case PlanType.Basic:
            return { daily: 100, monthly: 1000 };
        case PlanType.Premium:
            return { daily: 500, monthly: 5000 };
        default:
            throw new Error("Invalid plan type");
    }
}
exports.getLimitsForPlan = getLimitsForPlan;
