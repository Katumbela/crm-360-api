import axios from "axios";
import "dotenv/config";
import { Request, Response } from "express";
import { hack } from "../dummy/hack-query";

// Rota para busca de menções da marca no Twitter
export async function MonitorBrandMentions(req: Request, res: Response) {
  const { query } = req.body;

  console.log(query);
  const options = {
    method: "GET",
    url: "https://real-time-web-search.p.rapidapi.com/search",
    params: {
      q:
        "intitle:" +
        query +
        " OR intext:" +
        query +
        " site:youtube.com OR site:instagram.com OR site:facebook.com OR site:linkedin.com OR site:twitter.com OR site:pinterest.com OR site:tumblr.com OR site:reddit.com OR site:snapchat.com OR site:whatsapp.com OR site:telegram.org OR site:tiktok.com OR site:weibo.com OR site:vine.co OR site:periscope.tv OR site:forumotion.com OR site:disqus.com OR site:reddit.com OR site:stackoverflow.com OR site:blogspot.com OR site:medium.com OR site:wordpress.com OR site:angola24horas.com OR site:jornaldeangola.ao OR site:opais.co.ao OR site:angop.ao OR site:sapo.pt OR site:globo.com OR site:estadao.com.br OR site:folha.uol.com.br OR site:g1.globo.com",
      count: "20",
    },

    headers: {
      "X-RapidAPI-Key": "9d33715652msha31f124cb292d70p120a20jsn13f11eaa9b04",
      "X-RapidAPI-Host": "real-time-web-search.p.rapidapi.com",
    },
  };

  try {
    // Realiza a busca de tweets que mencionam a marca
    const response = await axios.request(options);

    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar menções da marca no Twitter:", error);
    res
      .status(500)
      .json({ error: "Erro ao buscar menções da marca no Twitter" });
  }
}
