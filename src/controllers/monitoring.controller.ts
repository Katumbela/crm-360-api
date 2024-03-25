import axios from "axios";
import { Request, Response } from "express";

export async function MnitoringYoutube(req: Request, res: Response) {
  const { parametro } = req.body;

  if (!parametro) {
    return res.status(400).json({ error: "Parâmetro não fornecido" });
  }

  // URL do endpoint de pesquisa do YouTube
  const searchUrl = "https://www.googleapis.com/youtube/v3/search";

  try {
    // Faz a solicitação HTTP para o endpoint de pesquisa do YouTube
    const response = await axios.get(searchUrl, {
      params: {
        q: `"${parametro}"`, // Usando aspas duplas para pesquisa exata
        part: "snippet",
        type: "video",
        maxResults: 10, // Número máximo de resultados
        key: "AIzaSyBMiXTITRJuVcvXEIAzfjnK6N8PMXo_52I", // Substitua pela sua própria chave de API do YouTube
      },
    });

    // Extrai os detalhes dos vídeos da resposta da pesquisa
    const videos = response.data.items.map((item: any) => ({
      titulo: item.snippet.title,
      descricao: item.snippet.description,
      link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));

    res.json(videos);
  } catch (error) {
    console.error("Erro ao fazer a solicitação HTTP:", error);
    res.status(500).json({ error: "Erro ao buscar vídeos no YouTube" });
  }
}
