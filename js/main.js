// Disable automatic scroll restoration
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Save scroll position before page unload
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollPosition", window.scrollY);
});

// Restore scroll position after page is fully loaded
window.addEventListener("load", () => {
  // Small delay to ensure CSS and animations are ready
  setTimeout(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition !== null) {
      const targetPosition = parseInt(savedPosition);

      // Smooth animated scroll restoration
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });

      // Clear the saved position after restoring
      sessionStorage.removeItem("scrollPosition");
    }
  }, 150); // Slightly longer delay for better visual stability
});

function copyCode(btn) {
  const codeBlock = btn.nextElementSibling;
  const text = codeBlock.textContent;
  navigator.clipboard.writeText(text).then(() => {
    const originalText = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  });
}

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
