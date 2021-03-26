import IMask from "imask";

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  let nameFull = form.querySelector('[name="nameFull"]');
  let phone = form.querySelector('[name="whatsapp"]');
  let email = form.querySelector('[name="email"]');
  let message = form.querySelector('[name="message"]');
  const btnSubmit = form.querySelector('[type="submit"]');
  let data = [];

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    data.push({ nameFull: nameFull.value });
    data.push({ phone: phone.value });
    data.push({ email: email.value });
    data.push({ message: message.value });

    console.log(data);
  });
});
