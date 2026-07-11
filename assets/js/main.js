(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  if (stored) root.setAttribute("data-theme", stored);

  function currentTheme() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        navToggle.classList.remove("active");
        navLinks.classList.remove("open");
      });
    });
  }

  /* ---------- Navbar scrolled state + back-to-top ---------- */
  var nav = document.getElementById("siteNav");
  var backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", function () {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("scrolled", y > 12);
    if (backToTop) backToTop.classList.toggle("visible", y > 500);
  }, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Active nav link on scroll ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navAnchors = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute("id");
          navAnchors.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* ---------- Hero role typing effect ---------- */
  var roleEl = document.getElementById("heroRole");
  if (roleEl) {
    var roles = [
      "Data Center Staff @ Indomobil Group",
      "Cyber Security Enthusiast",
      "Penetration Tester",
      "Automation Builder"
    ];
    var ri = 0, ci = 0, deleting = false;

    function tick() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        if (ci > word.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        ci--;
        if (ci < 0) {
          deleting = false;
          ri = (ri + 1) % roles.length;
          ci = 0;
        }
      }
      roleEl.textContent = word.slice(0, ci);
      setTimeout(tick, deleting ? 35 : 65);
    }
    tick();
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
