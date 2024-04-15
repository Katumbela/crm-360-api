// whatsappClient.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const path = require('path');


const whatsappclient = new Client({
  authStrategy: new LocalAuth(),
});

whatsappclient.on("qr", (qr) => {
  // Ao receber o QR code, enviamos para o cliente
  console.log('QR Code received:', qr);
});

whatsappclient.on("ready", () => console.log("Client is ready!"));

whatsappclient.on("message", async (msg) => {
  try {
    if (msg.from != "status@broadcast") {
      const contact = await msg.getContact();
      console.log(contact, msg.from);
    }
  } catch (error) {
    console.error(error);
  }
});

// Função para iniciar a conexão com o WhatsApp
const startWhatsAppConnection = () => {
  whatsappclient.initialize();
}

// Função para obter o QR code
const getQRCode = () => {
  return new Promise((resolve, reject) => {
    whatsappclient.on("qr", (qr) => {
      // Retornamos o QR code
      resolve(qr);
    });
  });
}


// Pasta onde as sessões serão armazenadas
const sessionDir = path.join(__dirname, '..', 'sessions');

// Função para obter a sessão de um usuário
function getSession(userId) {
    const sessionFilePath = path.join(sessionDir, `${userId}.json`);
    try {
        // Tenta ler o arquivo de sessão do usuário
        const sessionData = fs.readFileSync(sessionFilePath, 'utf8');
        return JSON.parse(sessionData);
    } catch (error) {
        // Se o arquivo não existe ou ocorrer outro erro, retorna null
        return null;
    }
}

// Função para salvar a sessão de um usuário
function saveSession(userId, sessionData) {
    const sessionFilePath = path.join(sessionDir, `${userId}.json`);
    fs.writeFileSync(sessionFilePath, JSON.stringify(sessionData));
}


module.exports = { startWhatsAppConnection, getSession, saveSession, getQRCode };
