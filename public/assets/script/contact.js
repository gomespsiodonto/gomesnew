import IMask from "imask";

var sendMail = firebase.functions().httpsCallable("sendMail");

document.querySelectorAll("#app").forEach((page) => {
  const contact = page.querySelector("#contact");
  const form = contact.querySelector("#form-contact");

  let nameFull = form.querySelector('[name="nameFull"]');
  let phone = form.querySelector('[name="phone"]');
  let email = form.querySelector('[name="email"]');
  let message = form.querySelector('[name="message"]');
  let emailProfile = form.querySelector('[name="emailProfile"]');
  const btnSubmit = form.querySelector('[type="submit"]');

  new IMask(phone, {
    mask: "(00) [0]0000-0000",
  });

  btnSubmit.addEventListener("click", (e) => {
    async () => {
      let url = "http://localhost:5001/gomespsiodonto/us-central1/sendMail";
      const res = await fetch(sendMail, {
        body: JSON.stringify({
          nameFull: nameFull.value,
          email: email.value,
          phone: phone.value,
          message: message.value,
          emailProfile: emailProfile.value,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
      });

      const result = await res.json();
      alert(result.message);
    };
  });
});
