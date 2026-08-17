(function () {
  "use strict";
  if (document.querySelector(".course-family-nav")) return;
  const script = document.currentScript;
  const root = new URL("../", script && script.src ? script.src : location.href);
  const stylesheetUrl = new URL("course-family-navigation.css?v=20260816", root).href;
  if (!document.querySelector("link[data-course-family-nav-styles]")) {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = stylesheetUrl;
    stylesheet.dataset.courseFamilyNavStyles = "";
    document.head.append(stylesheet);
  }
  const path = location.pathname.toLowerCase();
  const rootPath = root.pathname.replace(/\/$/, "").toLowerCase();
  const isHome = path === `${rootPath}/` || path === `${rootPath}/index.html`;
  const nav = document.createElement("nav");
  nav.className = "course-family-nav screen-only";
  nav.setAttribute("aria-label", "Folding Chair course navigation");
  const inner = document.createElement("div");
  inner.className = "course-family-nav__inner";
  const brand = document.createElement("a");
  brand.className = "course-family-nav__brand";
  brand.href = new URL("index.html", root).href;
  brand.innerHTML = '<span class="course-family-nav__mark" aria-hidden="true">FC</span><span>Folding Chair</span>';
  const links = document.createElement("div");
  links.className = "course-family-nav__links";
  const items = [
    ["Course", "index.html", isHome],
    ["Modules", "index.html#course-path-title", /\/weeks\d+-\d+\//.test(path)],
    ["Video learning", "youtube-library/video-library.html", path.includes("/youtube-library/")],
    ["Puzzles", "https://stevencowell.github.io/busy-worksheets/?library=timber", false, true],
    ["My folio", "folding-chair-folio.html", path.endsWith("/folding-chair-folio.html")],
    ["Project plans", "Folding-Chair-Project-Plans.pdf", false],
    ["Teacher resources", "teacher-resources.html", path.endsWith("/teacher-resources.html")],
    ["Main Menu", "https://stevencowell.github.io/Main-Page/", false, true]
  ];
  items.forEach(([label, href, current, external]) => {
    const link = document.createElement("a");
    link.textContent = label;
    link.href = external ? href : new URL(href, root).href;
    if (current) link.setAttribute("aria-current", "page");
    links.append(link);
  });
  inner.append(brand, links);
  nav.append(inner);
  document.body.prepend(nav);
  document.documentElement.classList.add("has-course-family-nav");
})();
