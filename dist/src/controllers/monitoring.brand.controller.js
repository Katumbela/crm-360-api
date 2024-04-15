"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorBrandMentions = void 0;
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const sentiment_1 = __importDefault(require("sentiment"));
const sentiment = new sentiment_1.default();
function getSentiment(snippet) {
    const result = sentiment.analyze(snippet);
    if (result.score > 0) {
        return 'Positivo';
    }
    else if (result.score < 0) {
        return 'Negativo';
    }
    else {
        return 'Neutro';
    }
}
async function MonitorBrandMentions(req, res) {
    const { query, region } = req.body;
    const options = {
        method: "GET",
        url: "https://real-time-web-search.p.rapidapi.com/search",
        params: {
            q: "intitle:" +
                query +
                " intext:" +
                query +
                " site:youtube.com OR site:instagram.com OR site:facebook.com OR site:linkedin.com OR site:twitter.com OR site:pinterest.com OR site:tumblr.com OR site:reddit.com OR site:snapchat.com OR site:whatsapp.com OR site:telegram.org OR site:tiktok.com OR site:weibo.com OR site:vine.co OR site:periscope.tv OR site:forumotion.com OR site:disqus.com OR site:reddit.com OR site:stackoverflow.com OR site:blogspot.com OR site:medium.com OR site:wordpress.com OR site:angola24horas.com OR site:jornaldeangola.ao OR site:opais.co.ao OR site:angop.ao OR site:sapo.pt OR site:globo.com OR site:estadao.com.br OR site:folha.uol.com.br OR site:g1.globo.com " + region,
            limit: "50",
        },
        headers: {
            "X-RapidAPI-Key": process.env.X_RAPID_KEY,
            "X-RapidAPI-Host": process.env.X_RAPID_HOST,
        },
    };
    try {
        const response = await axios_1.default.request(options);
        const dataWithSentiment = response.data.data.map((item) => ({
            ...item,
            sentiment: getSentiment(item.snippet),
        }));
        res.json({ ...response.data, data: dataWithSentiment });
    }
    catch (error) {
        console.error("Erro ao buscar menções da marca:", error);
        res.status(500).json({ error: "Erro ao buscar menções da marca" });
    }
}
exports.MonitorBrandMentions = MonitorBrandMentions;
