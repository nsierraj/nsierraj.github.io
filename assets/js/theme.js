/* Theme toggle and mobile nav. No dependencies. The inline script in _includes/site-theme.html
   applies the stored theme before paint; this file only handles the toggle itself. */
(function () {
  "use strict";

  var STORAGE_KEY = "as-theme";
  var root = document.documentElement;

  function currentlyDark() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) { return explicit === "dark"; }
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  function labelFor(btn) {
    btn.setAttribute("aria-label", currentlyDark() ? "Switch to light theme" : "Switch to dark theme");
  }

  function initThemeToggle() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) { return; }
    labelFor(btn);
    btn.addEventListener("click", function () {
      var next = currentlyDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage blocked: toggle still works for this page */ }
      labelFor(btn);
    });
  }

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) { return; }
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  initThemeToggle();
  initNavToggle();
})();
