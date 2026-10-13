const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const year = document.querySelector("#year");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    siteNav.classList.toggle("is-open", !isOpen);
  });

  siteNav.addEventListener("click", (event) => {
    const target = event.target;

    if (target instanceof Element && target.closest("a")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      siteNav.classList.remove("is-open");
      menuToggle.focus();
    }
  });
}

document.querySelectorAll(".copy-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const target = document.getElementById(button.dataset.copyTarget || "");

    if (!target || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(target.textContent || "");
      button.textContent = "Copied";
    } catch {
      button.textContent = "Press Ctrl+C";
    }

    setTimeout(() => {
      button.textContent = "Copy";
    }, 1800);
  });
});

if (year) {
  year.textContent = new Date().getFullYear();
}
