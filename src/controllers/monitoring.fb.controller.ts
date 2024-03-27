
import axios from "axios";
import { Request, Response } from "express";

export async function getFacebookPosts(req: Request, res: Response) {
  const { q } = req.body;

  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' não fornecido" });
  }

  try {
    // Faz a solicitação HTTP para a Graph API do Facebook
    const response = await axios.get(
      'https://graph.facebook.com/v12.0/search',
      {
        params: {
          q: q,
          type: 'post',
          access_token: "EAAMx4cbytZBABO2yR0ZBauxVbyFoLa6IQUV4H9o7Vxgq7eb7kmiCOpnZBhS2saYKZBOmc3DnZBLaSoHMK5ZCLX0KdOLavZBI8pOMYNzWOwCXndW4GAkdefeKLRn1lad3S0ezDUku7lSyVD0IGYPexW0Mqz6uDDlNuiNb8iNfREDPXjERBPoS2GjZBwjaZARX8tNwPLPuzKL9Vb6rrhiB8ZAwZDZD", // Substitua pelo seu token de acesso do Facebook
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Erro ao fazer a solicitação HTTP:", error);
    res.status(500).json({ error: "Erro ao buscar posts no Facebook" });
  }
}








