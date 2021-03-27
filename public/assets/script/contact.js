import IMask from "imask";

let nameFull;
let phone;
let email;
let message;

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  nameFull = form.querySelector('[name="nameFull"]');
  phone = form.querySelector('[name="whatsapp"]');
  email = form.querySelector('[name="email"]');
  message = form.querySelector('[name="message"]');
  const btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    index();
  });
});

export default function index() {
  const formContact = async function (e) {
    const res = await fetch("api/mailer", {
      body: JSON.stringify({
        nameFull: nameFull.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
    });

    console.log(res.json());
    const result = await res.json();
    alert(result.message);
  };
  return formContact();
}
