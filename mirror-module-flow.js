(() => {
  "use strict";

  const text = (node) => (node?.textContent || "").replace(/\s+/g, " ").trim();
  const moduleTitleFromPage = () => {
    const bannerTitle = text(document.querySelector(".part-banner h2"));
    if (bannerTitle.includes(":")) return bannerTitle.replace(/^[^:]+:\s*/, "");
    const subtitle = text(document.querySelector(".hero-subtitle, [data-module-summary]"));
    return subtitle && !/^weeks?\b/i.test(subtitle) ? subtitle : "";
  };

  function alignModuleFlow() {
    const main = document.querySelector("main");
    if (!main || document.body.dataset.mirrorFlowReady === "true") return false;

    let presentation = document.querySelector(".module-presentation-card") ||
      [...document.querySelectorAll(".lesson-overview")].find((panel) =>
        /module presentation/i.test(text(panel.querySelector(".section-kicker, .eyebrow"))));

    if (!presentation && location.pathname.toLowerCase().includes("/desk-tidy/weeks")) {
      presentation = document.querySelector(".lesson-overview");
      const week = location.pathname.match(/weeks(\\d+)-(\\d+)/i);
      if (presentation && week) {
        const copy = presentation.querySelector(".overview-heading, div") || presentation;
        const kicker = copy.querySelector(".section-kicker");
        const heading = copy.querySelector("h2");
        const paragraph = copy.querySelector("p:not(.section-kicker)");
        if (kicker) kicker.textContent = "Module presentation";
        if (heading) heading.textContent = "Learn with the slides";
        if (paragraph) paragraph.textContent = "Use the presentation to preview this module before working through the theory, videos, checks and written evidence.";
        presentation.querySelector(".roadmap")?.remove();
        const download = document.createElement("a");
        download.className = "primary-button";
        download.href = `../presentations/desk-tidy-weeks-${week[1]}-${week[2]}.pptx`;
        download.download = "";
        download.textContent = "Download presentation";
        presentation.append(download);
      }
    }

    const evidence = document.querySelector(".student-strip, .student-panel, .student-evidence, .aligned-student-evidence, [aria-labelledby='student-details-title']");
    if (!presentation || !evidence) return false;

    document.body.classList.add("mirror-module-flow");
    document.body.dataset.mirrorFlowReady = "true";
    presentation.classList.add("module-presentation-card");

    const support = document.querySelector(".module-support-panel");
    if (support) {
      const actions = support.querySelector(".module-support-actions, .button-row");
      if (actions) {
        actions.classList.add("mirror-support-actions");
        presentation.append(actions);
      }
      support.remove();
    }

    document.querySelector(".module-preview-card")?.remove();

    const heroTitle = document.querySelector(".lesson-hero h1, .module-hero h1, .page-hero h1, [data-module-title]");
    const heroSubtitle = document.querySelector(".hero-subtitle, [data-module-summary], .page-hero-sub");
    const duplicateOverview = [...document.querySelectorAll(".lesson-overview")]
      .find((panel) => panel !== presentation);
    const summary = duplicateOverview?.querySelector(".module-summary");

    if (heroTitle && /^weeks?\b/i.test(text(heroTitle))) {
      const namedTitle = moduleTitleFromPage();
      if (namedTitle) heroTitle.textContent = namedTitle;
    }
    if (heroSubtitle && summary && text(summary)) heroSubtitle.textContent = text(summary);
    duplicateOverview?.remove();

    evidence.classList.add("student-strip");
    evidence.classList.remove("card");
    presentation.insertAdjacentElement("afterend", evidence);
    document.querySelector(".lesson-nav")?.remove();
    document.querySelectorAll(".part-banner").forEach((banner) => banner.classList.add("mirror-theory-divider"));
    return true;
  }

  if (!alignModuleFlow()) {
    const observer = new MutationObserver(() => {
      if (alignModuleFlow()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }
})();
