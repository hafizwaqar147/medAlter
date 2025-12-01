// src/scripts/main.ts

// Helper to select elements
const qs = <T extends Element>(selector: string) =>
  document.querySelector<T>(selector);

const qsa = <T extends Element>(selector: string) =>
  Array.from(document.querySelectorAll<T>(selector));

// 0. Dark Mode / Theme Toggle
const themeToggle = qs<HTMLButtonElement>("#theme-toggle");
const themeIcon = qs<HTMLSpanElement>("#theme-icon");

const isDarkMode = () =>
  document.documentElement.classList.contains("dark") ||
  (typeof localStorage !== "undefined" &&
    localStorage.getItem("theme") === "dark");

const setTheme = (dark: boolean) => {
  if (dark) {
    document.documentElement.classList.add("dark");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", "dark");
    }
    if (themeIcon) {
      themeIcon.textContent = "☀️";
      themeIcon.style.transform = "rotate(180deg)";
    }
  } else {
    document.documentElement.classList.remove("dark");
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("theme", "light");
    }
    if (themeIcon) {
      themeIcon.textContent = "🌙";
      themeIcon.style.transform = "rotate(0deg)";
    }
  }
};

// Initialize theme from localStorage or system preference
if (typeof localStorage !== "undefined") {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    setTheme(savedTheme === "dark");
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    setTheme(true);
  }
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  setTheme(true);
}

// Toggle theme on button click
themeToggle?.addEventListener("click", () => {
  if (themeIcon) {
    themeIcon.style.transition = "transform 0.5s ease-in-out";
  }
  setTheme(!isDarkMode());
});

// 1. Scroll-triggered reveal animations
const revealElements = qsa<HTMLElement>(".reveal-on-scroll");

if ("IntersectionObserver" in window && revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

// 2. Sticky navbar background transition
const navbar = qs<HTMLElement>("#navbar");

const updateNavbar = () => {
  if (!navbar) return;
  const scrolled = window.scrollY > 12;
  if (scrolled) {
    navbar.classList.add(
      "bg-white/90",
      "backdrop-blur",
      "shadow-md",
      "border-b",
      "border-slate-200"
    );
  } else {
    navbar.classList.remove(
      "bg-white/90",
      "backdrop-blur",
      "shadow-md",
      "border-b",
      "border-slate-200"
    );
  }
};

window.addEventListener("scroll", updateNavbar);
updateNavbar();

// 3. FAQ accordion logic
const faqToggles = qsa<HTMLButtonElement>(".faq-toggle");

faqToggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const id = toggle.dataset.faqId;
    if (!id) return;

    const panel = qs<HTMLElement>(`#${id}`);
    const icon = qs<HTMLElement>(`[data-faq-icon-for="${id}"]`);

    if (!panel || !icon) return;

    const isOpen = panel.style.maxHeight && panel.style.maxHeight !== "0px";

    // Close all others (accordion behavior)
    qsa<HTMLElement>(".faq-panel").forEach(p => {
      p.style.maxHeight = "0px";
    });
    qsa<HTMLElement>(".faq-icon").forEach(i => {
      i.textContent = "+";
    });

    if (!isOpen) {
      panel.style.maxHeight = panel.scrollHeight + "px";
      icon.textContent = "−";
    }
  });
});

// 4. Billing toggle (Monthly / Yearly)
const billingToggle = qs<HTMLButtonElement>("#billing-toggle");
const billingToggleKnob = qs<HTMLSpanElement>("#billing-toggle-knob");
const monthlyLabel = qs<HTMLSpanElement>("#billing-monthly-label");
const yearlyLabel = qs<HTMLSpanElement>("#billing-yearly-label");
const pricingCards = qsa<HTMLElement>("#pricing-cards article p[data-monthly]");

let yearly = false;

const updateBillingDisplay = () => {
  pricingCards.forEach(priceElement => {
    const monthly = priceElement.getAttribute("data-monthly") ?? "";
    const yearlyPrice = priceElement.getAttribute("data-yearly") ?? monthly;
    priceElement.textContent = yearly ? yearlyPrice : monthly;
  });

  if (monthlyLabel && yearlyLabel && billingToggleKnob) {
    if (yearly) {
      monthlyLabel.classList.remove("text-slate-900");
      monthlyLabel.classList.add("text-slate-500");
      yearlyLabel.classList.remove("text-slate-500");
      yearlyLabel.classList.add("text-slate-900");
      billingToggleKnob.style.transform = "translateX(16px)";
    } else {
      yearlyLabel.classList.remove("text-slate-900");
      yearlyLabel.classList.add("text-slate-500");
      monthlyLabel.classList.remove("text-slate-500");
      monthlyLabel.classList.add("text-slate-900");
      billingToggleKnob.style.transform = "translateX(0px)";
    }
  }
};

billingToggle?.addEventListener("click", () => {
  yearly = !yearly;
  updateBillingDisplay();
});

updateBillingDisplay();

// 5. Simple wiring for search & image input (demo only)
// In production, you would connect these to your back-end / AI services.

const searchInput = qs<HTMLInputElement>("#search-input");
const imageInput = qs<HTMLInputElement>("#image-input");

searchInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;
    // Placeholder: You would call your search API here.
    console.log("Search alternative medicine by salt/chemical/herb:", query);
  }
});

imageInput?.addEventListener("change", () => {
  const file = imageInput.files?.[0];
  if (!file) return;
  // Placeholder: send file to picture-based detection endpoint.
  console.log("Medicine image selected for AI analysis:", file.name);
});

// 6. Dynamic year in footer
const yearSpan = qs<HTMLSpanElement>("#year");
if (yearSpan) {
  yearSpan.textContent = String(new Date().getFullYear());
}