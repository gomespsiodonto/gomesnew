document.querySelectorAll("#app, #error404").forEach((page) => {
  const header = page.querySelector("#menu");
  const close = header.querySelector("#menu-close");
  const overlay = header.querySelector("#overlay");
  const open = header.querySelector(".menu-mobile");

  if (open) {
    open.addEventListener("click", (e) => {
      header.classList.add("open");
    });
  }

  if (close) {
    close.addEventListener("click", (e) => {
      header.classList.remove("open");
    });
  }

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      header.classList.remove("open");
    });
  }
});
