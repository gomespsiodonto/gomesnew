require("dotenv/config");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
// id do cliente: 412357641183-sc6qsn3j5v6h9m62tme84e2d4qss4i4o.apps.googleusercontent.com

//chave secreta: FPZ4P3f6-SXUAdm72VaoJs1D

//Refresh token: 1//04oCNIwKeScYDCgYIARAAGAQSNwF-L9Irly5jCheWghPmMZHak-ZlZ-Zclim0nzED84TA9WtC-LQNWrdpImsrU-Rt4JH1JGRQcbU

//OAuth2 Authentication

export default (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLINT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const redirectURI = process.env.REDIRECT_URI;
  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(clientID, secretKey, redirectURI);

  oauth2Client.setCredentials({
    refresh_token,
  });

  const accessToken = oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    logger: false,
    debug: false,
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
    from: "davimatana.promoter@gmail.com",
    to: "matananh@gmail.com",
    // bcc: 'joao@hcode.com.br',
    subject: "Contato via Site: Gomes Espaço Multi-diciplinar",
    html: `
    <h1 style='font-size:1.5em; text-align:center;'>Contato</h1>
    <p>
    <strong>Nome:</strong> ${req.body.nameFull}<br/>
    <strong>E-mail:</strong> ${req.body.email}<br/>
    <strong>Telefone:</strong> ${req.body.phone} <br/>
    <strong>Mensagem:</strong> ${req.body.message}<br/> 
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
};
