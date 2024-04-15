"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGMentions = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
async function getGMentions(req, res) {
    const { query } = req.body;
    const apiKey = process.env.GOOGLE_SEACRH_API;
    const searchEngineId = process.env.GOOGLE_CX;
    console.log(apiKey);
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}:omuauf_lfve&q=${query}`;
    try {
        const response = await axios_1.default.get(url);
        return res.json(response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Erro ao fazer a pesquisa no Google:', error.response?.data);
        }
        else {
            console.error('Erro ao fazer a pesquisa no Google:', error.message);
        }
        throw error;
    }
}
exports.getGMentions = getGMentions;
