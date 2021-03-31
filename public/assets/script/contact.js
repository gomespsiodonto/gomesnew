const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv/config");
import IMask from "imask";

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  let nameFull = form.querySelector('[name="nameFull"]');
  let phone = form.querySelector('[name="whatsapp"]');
  let email = form.querySelector('[name="email"]');
  let message = form.querySelector('[name="message"]');
  let professional = form.querySelector("#professional");
  let btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  nameFull = nameFull.value;
  email = email.value;
  phone = phone.value;
  message = message.value;
  professional = professional.value;

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    let clientId = process.env.CLIENT_ID;
    let clientSecret = process.env.CLIENT_SECRET;
    let refreshToken = process.env.REFRESH_TOKEN;
    let redirectURI = process.env.REDIRECT_URI;
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(clientId, clientSecret, redirectURI);

    oauth2Client.setCredentials({
      refreshToken,
    });

    async function sendMail() {
      try {
        const accessToken = await oauth2Client.getAccessToken();

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
          from: "Suporte Site!! <davimatana.promoter@gmail.com>",
          to: "matananh@gmail.com",
          //to: `${professional}`,
          replyTo: `${email}`,
          subject: "Contato via Site: Gomes Espaço Multi-diciplinar",
          html: `
          <h1 style='font-size:1.5em; text-align:center;'>Contato</h1>
          <p>
          <strong>Nome:</strong> ${nameFull}<br/>
          <strong>E-mail:</strong> ${email}<br/>
          <strong>Telefone:</strong> ${whatsapp} <br/>
          <strong>Mensagem:</strong> ${message}<br/> 
          <strong>Mensagem:</strong> ${professional}<br/>
          </p>
          `,
        };

        const result = await transporter.sendMail(mailOptions);
        return result;
      } catch (error) {
        return error;
      }
    }
  });
  sendMail()
    .then((result) => console.log("E-mail sent...", result))
    .catch((error) => console.log(error.message));
});
