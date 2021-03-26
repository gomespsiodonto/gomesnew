import IMask from "imask";

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  let nameFull = form.querySelector('[name="nameFull"]');
  let phone = form.querySelector('[name="whatsapp"]');
  let email = form.querySelector('[name="email"]');
  let message = form.querySelector('[name="message"]');
  const btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const res = fetch("../../../api/mailer", {
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

    const result = res.json();
    alert(result.message);
  });
});
