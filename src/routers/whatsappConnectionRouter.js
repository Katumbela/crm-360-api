const express = require('express');
const router = new express.Router();
const db = require('../db.json');
const whatsappclient = require("../services/WhatsappClient");

router.post('/whatsapp/connect', (req, res) => {
  const { token } = req.body;
  // Aqui você deve verificar se o token é válido
  // Por exemplo, verificando se o token está na lista de tokens válidos no seu banco de dados
  // Vou supor que você já tem essa lógica implementada e o token é válido
  // Aqui você conectaria a conta do WhatsApp
  whatsappclient.initialize();
  db.connectedAccounts.push(token); // Adiciona a conta conectada à base de dados
  res.status(200).send('WhatsApp connected successfully');
});

module.exports = router;
