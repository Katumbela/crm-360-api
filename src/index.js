const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors"); // Importe o middleware cors
const { startWhatsAppConnection, getQRCode } = require('./services/WhatsappClient');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Habilitar o CORSapp.use(cors({ origin: '*' }));

app.use(cors({ origin: '*' }));


app.get('/', async (req, res) => {
  try {
    // Inicie a conexão com o WhatsApp
    startWhatsAppConnection();
    // Obtenha o QR code
    const qrCode = await getQRCode();
    // Envie o QR code para o cliente através do WebSocket
    io.emit('qrCode', qrCode);
    res.status(200).send(qrCode);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

server.listen(3001, () => console.log(`Server is ready on port 3001`));
