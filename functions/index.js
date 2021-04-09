"use strict";
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv/config");

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const refreshToken = process.env.REFRESH_TOKEN;
    const redirectURI = process.env.REDIRECT_URI;
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(clientId, clientSecret, redirectURI);

    oauth2Client.setCredentials({
      refreshToken,
    });

    const accessToken = oauth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      // host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      // logger: false,
      // debug: false,
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "davimatana.promoter@gmail.com",
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      },
    });

    const mailOptions = {
      from: '"Suporte"<davimatana.promoter@gmail.com>',
      to: "matananh@gmail.com",
      replyTo: `${req.body.email}`,
      //to: `${req.body.emailProfile}`,
      // bcc: 'joao@hcode.com.br',
      subject: "Contato via Site: Gomes Espaço Multi-diciplinar",
      html: `
        <h1 style='font-size:2em; text-align:center;'>Contato</h1>
        <p>
        <strong>Nome:</strong> ${req.body.nameFull}<br/>
        <strong>E-mail:</strong> ${req.body.email}<br/>
        <strong>Telefone:</strong> ${req.body.phone} <br/>
        <strong>Mensagem:</strong> ${req.body.message}<br/> 
        <strong>Mensagem:</strong> ${req.body.emailProfile}<br/>
        </p>
      `,
    };

    try {
      const result = transporter.sendMail(mailOptions);
      if (!result.reject) {
        res.status(200).json({ message: "Mensagem enviada com sucesso" });
      } else {
        res.status(500).json({ message: result.reject });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
});
