
const express = require('express');
const router = new express.Router();
const whatsappclient = require("../services/WhatsappClient")

router.get('/home', (req, res) => {
  res.send('Hello World!');
});

router.post("/message", (req, res) => {
  whatsappclient.sendMessage(req.body.phoneNumber, req.body.message);
  res.send();
})

module.exports = router