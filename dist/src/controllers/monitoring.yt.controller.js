"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYoutubeVideos = void 0;
const axios_1 = __importDefault(require("axios"));
const sentiment_1 = __importDefault(require("sentiment"));
// Importa a biblioteca do Google Cloud Natural Language
const language_1 = require("@google-cloud/language");
const env_1 = require("../dummy/env");
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
// Configuração do cliente da API do Google Cloud Natural Language
const languageClient = new language_1.LanguageServiceClient();
async function getYoutubeVideos(req, res) {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: "Parâmetro não fornecido" });
    }
    // URL do endpoint de pesquisa do YouTube
    const searchUrl = "https://www.googleapis.com/youtube/v3/search";
    try {
        // Faz a solicitação HTTP para o endpoint de pesquisa do YouTube
        const response = await axios_1.default.get(searchUrl, {
            params: {
                q: `"${query}"`, // Usando aspas duplas para pesquisa exata
                part: "snippet",
                type: "video",
                maxResults: 100, // Número máximo de resultados
                key: env_1.Env.YT_API_KEY, // Substitua pela sua própria chave de API do YouTube
            },
        });
        // Extrai os detalhes dos vídeos da resposta da pesquisa
        const videos = await Promise.all(response.data.items.map(async (item) => {
            // Obtém detalhes adicionais do vídeo
            const videoDetailsUrl = "https://www.googleapis.com/youtube/v3/videos";
            const videoDetailsResponse = await axios_1.default.get(videoDetailsUrl, {
                params: {
                    part: "snippet,statistics",
                    id: item.id.videoId,
                    key: env_1.Env.YT_API_KEY,
                },
            });
            const videoDetails = videoDetailsResponse.data.items[0];
            // Obtém detalhes do canal (autor do vídeo)
            const channelDetailsUrl = "https://www.googleapis.com/youtube/v3/channels";
            const channelDetailsResponse = await axios_1.default.get(channelDetailsUrl, {
                params: {
                    part: "snippet,statistics",
                    id: videoDetails.snippet.channelId,
                    key: env_1.Env.YT_API_KEY,
                },
            });
            const channelDetails = channelDetailsResponse.data.items[0];
            // Analisa o sentimento da descrição do vídeo usando a API do Google Natural Language
            const sentiment = getSentiment(item.snippet.description);
            // Constrói o objeto de vídeo com detalhes adicionais e o sentimento
            const video = {
                titulo: item.snippet.title,
                descricao: item.snippet.description,
                link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                autor: videoDetails.snippet.channelTitle,
                fotoPerfilAutor: channelDetails.snippet.thumbnails.default.url,
                visualizacoes: videoDetails.statistics.viewCount,
                dataPublicacao: new Date(item.snippet.publishedAt),
                thumbnail: item.snippet.thumbnails.default.url,
                sentimento: sentiment,
                seguidores: channelDetails.statistics.subscriberCount,
                comentarios: videoDetails.statistics.commentCount,
                likes: videoDetails.statistics.likeCount,
            };
            return video;
        }));
        return res.status(200).json(videos);
    }
    catch (error) {
        console.error("Erro ao fazer a solicitação HTTP:", error);
        res.status(500).json({ error: "Erro ao buscar vídeos no YouTube" });
    }
}
exports.getYoutubeVideos = getYoutubeVideos;
// Função para analisar o sentimento usando a API do Google Natural Language
async function analyzeSentiment(text) {
    try {
        // Realiza a análise de sentimento
        const [result] = await languageClient.analyzeSentiment({ document: { content: text, type: 'PLAIN_TEXT' } });
        const sentimentScore = result.documentSentiment?.score || 0;
        // Determina o nível de sentimento com base no score
        if (sentimentScore > 0.2) {
            return "positivo";
        }
        else if (sentimentScore < -0.2) {
            return "negativo";
        }
        else {
            return "neutro";
        }
    }
    catch (error) {
        console.error("Erro ao analisar sentimento:", error);
        return "neutro"; // Retorna neutro em caso de erro
    }
}
