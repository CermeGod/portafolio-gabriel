const toggle = document.querySelector(".nav-toggle");
const drawer = document.querySelector("[data-drawer]");

if (toggle && drawer) {
  toggle.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  drawer.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    drawer.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });
}

const navLinks = [...document.querySelectorAll(".nav__link")];
const sectionIds = navLinks
  .map(a => a.getAttribute("href"))
  .filter(h => h && h.startsWith("#"));

const sections = sectionIds
  .map(id => document.querySelector(id))
  .filter(Boolean);

if (sections.length && "IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;

      navLinks.forEach(a => {
        a.classList.toggle("is-active", a.getAttribute("href") === id);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach(sec => obs.observe(sec));
}

const tocToggle = document.querySelector(".toc__toggle");
const tocList = document.querySelector(".toc__list");
if (tocToggle && tocList) {
  tocToggle.addEventListener("click", () => {
    const expanded = tocToggle.getAttribute("aria-expanded") !== "false";
    tocToggle.setAttribute("aria-expanded", String(!expanded));
    tocList.style.display = expanded ? "none" : "block";
  });
}

const panel = document.getElementById("sidePanel");
const langBtn = document.getElementById("langThemeBtn");
const langBtnMobile = document.getElementById("langThemeBtnMobile");
const themeBtn = document.getElementById("btnTheme");
const btnEnglish = document.getElementById("btnEnglish");
const btnSpanish = document.getElementById("btnSpanish");

function togglePanel(){
  if (!panel) return;
  panel.classList.toggle("open");
}

if (langBtn) langBtn.addEventListener("click", togglePanel);
if (langBtnMobile) langBtnMobile.addEventListener("click", togglePanel);

if (themeBtn) {
  themeBtn.addEventListener("click", ()=>{
    document.body.classList.toggle("theme-light");
  });
}

function setSpanish(){
  const links = document.querySelectorAll(".nav__link");
  const map = {
    "#sobre-mi": "Sobre mí",
    "#trayectoria": "Trayectoria",
    "#metodo": "Mi método",
    "#proyectos": "Proyectos",
    "#cv": "Mi CV",
    "#contacto": "Contacto"
  };
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (map[href]) a.textContent = map[href];
  });

  const heroText = document.querySelector(".hero__text");
  if (heroText) {
    heroText.innerHTML =
      'Estudiante de Ingeniería de Sistemas en la UPC con enfoque en <strong>análisis de datos</strong> y ' +
      '<strong>diseño web</strong>. Me gusta lo medible: datos limpios, decisiones claras y entregables ordenados.';
  }
}

function setEnglish(){
  const links = document.querySelectorAll(".nav__link");
  const map = {
    "#sobre-mi": "About me",
    "#trayectoria": "Timeline",
    "#metodo": "My approach",
    "#proyectos": "Projects",
    "#cv": "My CV",
    "#contacto": "Contact"
  };
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (map[href]) a.textContent = map[href];
  });

  const heroText = document.querySelector(".hero__text");
  if (heroText) {
    heroText.innerHTML =
      'Information Systems student at UPC focused on <strong>data analysis</strong> and ' +
      '<strong>web design</strong>. I like measurable things: clean data, clear decisions and organized deliverables.';
  }
}

if (btnSpanish) btnSpanish.addEventListener("click", setSpanish);
if (btnEnglish) btnEnglish.addEventListener("click", setEnglish);
