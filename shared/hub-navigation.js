(function () {
  "use strict";
  const root = new URL("../", document.currentScript.src);
  const path = location.pathname.toLowerCase();
  const home = path === root.pathname.toLowerCase() || path.endsWith("/index.html");
  if (document.querySelector(".course-family-nav")) return;
  const nav = document.createElement("nav");
  nav.className = "course-family-nav screen-only";
  nav.setAttribute("aria-label", "Folding Chair course navigation");
  const inner = document.createElement("div"); inner.className = "course-family-nav__inner";
  const brand = document.createElement("a"); brand.className = "course-family-nav__brand"; brand.href = new URL("index.html", root); brand.innerHTML = '<span class="course-family-nav__mark" aria-hidden="true">FC</span><span>Folding Chair</span>';
  const links = document.createElement("div"); links.className = "course-family-nav__links";
  const items = [["Course","index.html",home],["Modules","index.html#main-content",path.includes("/weeks")],["Video learning","youtube-library/video-library.html",path.includes("/youtube-library/")],["Busy Work","https://stevencowell.github.io/busy-worksheets/?library=timber",false,true],["My folio","folding-chair-folio.html",path.endsWith("folding-chair-folio.html")],["Open Plans","Folding-Chair-Project-Plans.pdf",false],["Teacher resources","README.md",false],["Main Menu","https://stevencowell.github.io/Main-Page/",false,true]];
  for (const [label, href, current, external] of items) { const a = document.createElement("a"); a.textContent = label; a.href = external ? href : new URL(href, root); if (current) a.setAttribute("aria-current", "page"); links.append(a); }
  inner.append(brand, links); nav.append(inner); document.body.prepend(nav); document.documentElement.classList.add("has-course-family-nav");
})();
