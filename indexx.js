// index.js
const express = require("express")
const { startWhatsAppConnection, getQRCode } = require('./services/WhatsappClient');

const app = express()
app.use(express.json())
app.use(messageRouter)

app.get('/', async (req, res) => {
  try {
    // Aqui você deve realizar a autenticação do usuário com o Firebase
    // Suponha que o usuário já está autenticado com sucesso
    // Inicie a conexão com o WhatsApp
    startWhatsAppConnection();
    // Obtenha o QR code
    const qrCode = await getQRCode();
    // Retorne o QR code para o cliente
    res.status(200).json({ qrCode });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(3001, () => console.log(`Server is ready in on port 3001`))
