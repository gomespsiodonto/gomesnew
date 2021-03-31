import IMask from "imask";

let nameFull;
let phone;
let email;
let message;
let professional;

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  nameFull = form.querySelector('[name="nameFull"]');
  phone = form.querySelector('[name="whatsapp"]');
  email = form.querySelector('[name="email"]');
  message = form.querySelector('[name="message"]');
  professional = form.querySelector("#professional");
  const btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    const dados = {
      body: JSON.stringify({
        nameFull: nameFull.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
        professional: professional.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
    };

    console.log(dados);
    fetch("../../../api/mailer.js")
      .then((res) => dados)
      .catch(error);
  });
});
