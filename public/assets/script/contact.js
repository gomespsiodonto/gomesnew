import IMask from "imask";

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  let nameFull = form.querySelector('[name="nameFull"]');
  let phone = form.querySelector('[name="whatsapp"]');
  let email = form.querySelector('[name="email"]');
  let message = form.querySelector('[name="message"]');
  let professional = form.querySelector('[name="email-profile"]');
  const btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    () => {
      async (e) => {
        let url = "http://localhost:5001/gomespsiodonto/us-central1/sendMail";
        const res = await fetch(url, {
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
        });

        console.log(res.json());
        const result = await res.json();
        alert(result.message);
      };
    };
    e.preventDefault();
  });
});
