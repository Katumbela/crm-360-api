import axios, { AxiosError } from "axios";
import "dotenv/config";
import { Request, Response } from "express";

export async function getGMentions(req: Request, res: Response) {
  const { query } = req.body;
  const apiKey = process.env.GOOGLE_SEACRH_API;
  const searchEngineId = process.env.GOOGLE_CX;
  console.log(apiKey)

  const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}:omuauf_lfve&q=${query}`;
  try {
    const response = await axios.get(url);
    return res.json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao fazer a pesquisa no Google:', error.response?.data);
    } else {
      console.error('Erro ao fazer a pesquisa no Google:', error.message);
    }
    throw error;
  }
}
