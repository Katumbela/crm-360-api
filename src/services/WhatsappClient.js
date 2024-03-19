// whatsappClient.js
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

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

module.exports = { startWhatsAppConnection, getQRCode };
