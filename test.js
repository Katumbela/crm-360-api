const axios = require("axios");

// Endpoint da sua API
const BASE_URL = "http://localhost:3000";

// Função para autenticar um usuário e obter um token
async function authenticate(username, password) {
  try {
    const response = await axios.post(`${BASE_URL}/auth`, {
      username,
      password,
    });
    const token = response.data.token;
    console.log("Token:", token);
    return token;
  } catch (error) {
    console.error("Erro ao autenticar:", error.response.data);
    return null;
  }
}

// Função para conectar uma conta do WhatsApp
async function connectWhatsApp(token) {
  try {
    const response = await axios.post(`${BASE_URL}/whatsapp/connect`, {
      token,
    });
    console.log(response.data);
  } catch (error) {
    console.error("Erro ao conectar WhatsApp:", error.response.data);
  }
}

// Função para enviar uma mensagem
async function sendMessage(token, phoneNumber, message) {
  try {
    const response = await axios.post(
      `${BASE_URL}/message`,
      { phoneNumber, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Mensagem enviada com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error.response.data);
  }
}

// Função para ler as mensagens recebidas
async function readMessages(token) {
  try {
    const response = await axios.get(`${BASE_URL}/messages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Mensagens recebidas:", response.data);
  } catch (error) {
    console.error("Erro ao ler mensagens:", error.response.data);
  }
}

// Exemplo de uso
async function testAPI() {
  // Autenticar usuário e obter token
  const token = await authenticate("usuario1", "senha1");

  // Conectar conta do WhatsApp
  await connectWhatsApp(token);

  // Enviar mensagem
  await sendMessage(token, "+1234567890", "Olá, mundo!");

  // Ler mensagens recebidas
  await readMessages(token);
}

// Executar o teste da API
testAPI();
