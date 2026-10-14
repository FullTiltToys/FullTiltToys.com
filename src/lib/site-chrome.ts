export const siteChromeScript = `
(function () {
  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function pinScroll(run) {
    var x = window.scrollX || 0;
    var y = window.scrollY || 0;
    run();
    window.scrollTo(x, y);
    requestAnimationFrame(function () {
      window.scrollTo(x, y);
    });
  }

  if (!window.__fttKeepView) {
    window.__fttKeepView = true;
    document.addEventListener(
      "click",
      function (event) {
        var target = event.target;
        if (!target || !target.closest) return;

        var summary = target.closest("summary");
        var details = summary && summary.parentElement;
        if (details && details.tagName === "DETAILS") {
          event.preventDefault();
          pinScroll(function () {
            details.open = !details.open;
          });
          return;
        }

        var label = target.closest('label[for$="-more-toggle"]');
        if (!label) return;
        var id = label.getAttribute("for");
        var input = id && document.getElementById(id);
        if (!input) return;
        event.preventDefault();
        pinScroll(function () {
          input.checked = !input.checked;
          if (input.focus) {
            try {
              input.focus({ preventScroll: true });
            } catch (err) {}
          }
        });
      },
      true
    );
  }

  function dockItems(nav) {
    return nav.querySelectorAll(".site-nav-button, .status-bar");
  }

  function flipDock(nav, docked) {
    var els = dockItems(nav);
    var first = [];
    var i;
    for (i = 0; i < els.length; i++) {
      first.push(els[i].getBoundingClientRect());
    }
    nav.classList.toggle("is-docked", docked);
    if (reduceMotion()) return;
    for (i = 0; i < els.length; i++) {
      var el = els[i];
      var last = el.getBoundingClientRect();
      var dx = first[i].left + first[i].width / 2 - (last.left + last.width / 2);
      var dy = first[i].top + first[i].height / 2 - (last.top + last.height / 2);
      if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) continue;
      var running = el.getAnimations();
      var a;
      for (a = 0; a < running.length; a++) running[a].cancel();
      var arcX = docked ? -18 : 18;
      var arcY = docked ? 12 : -12;
      el.animate(
        [
          {
            transform:
              "translate(" +
              dx +
              "px, " +
              dy +
              "px) rotate(" +
              (docked ? "-5deg" : "5deg") +
              ") scale(1.03)",
          },
          {
            offset: 0.4,
            transform:
              "translate(" +
              (dx * 0.58 + arcX) +
              "px, " +
              (dy * 0.5 + arcY) +
              "px) rotate(" +
              (docked ? "-7deg" : "7deg") +
              ") scale(1.01)",
          },
          {
            offset: 0.74,
            transform:
              "translate(" +
              dx * 0.16 +
              "px, " +
              dy * 0.12 +
              "px) rotate(" +
              (docked ? "-2deg" : "2deg") +
              ") scale(1)",
          },
          {
            transform: "translate(0, 0) rotate(0deg) scale(1)",
          },
        ],
        {
          duration: 980,
          delay: i * 70,
          easing: "cubic-bezier(0.45, 0.02, 0.12, 1)",
          fill: "both",
        }
      );
    }
  }

  function update() {
    var header = document.getElementById("site-header");
    var nav = document.getElementById("site-nav");
    var frame = document.getElementById("social-frame");
    var barTop = document.getElementById("right-bar-top");
    var barBottom = document.getElementById("right-bar-bottom");
    if (!header || !nav) return;

    var headerBottom = header.getBoundingClientRect().bottom;
    var wasDocked = nav.classList.contains("is-docked");
    var docked = wasDocked ? headerBottom <= 10 : headerBottom <= 0;
    if (docked !== wasDocked) {
      flipDock(nav, docked);
    }

    var vh = window.innerHeight || 0;
    var rect = frame ? frame.getBoundingClientRect() : null;
    var gapTop = rect ? rect.top : vh;
    var gapBottom = rect ? rect.bottom : vh;

    if (barTop) {
      barTop.style.height = Math.max(0, Math.min(vh, gapTop)) + "px";
    }
    if (barBottom) {
      var start = Math.max(0, Math.min(vh, gapBottom));
      barBottom.style.top = start + "px";
      barBottom.style.height = Math.max(0, vh - start) + "px";
    }

    var border = 24;
    var whiteTop = rect ? rect.top + border : vh;
    var whiteBottom = rect ? rect.bottom - border : vh;
    var anyOnWhite = false;
    var buttons = nav.querySelectorAll(".site-nav-button");
    var i;
    for (i = 0; i < buttons.length; i++) {
      var box = buttons[i].getBoundingClientRect();
      var onWhite = docked && box.bottom > whiteTop && box.top < whiteBottom;
      buttons[i].classList.toggle("is-on-white", onWhite);
      if (onWhite) anyOnWhite = true;
    }
    nav.classList.toggle("is-on-white", anyOnWhite);
  }

  window.updateSiteChrome = update;

  if (!window.__fttChromeBound) {
    window.__fttChromeBound = true;
    var ticking = false;
    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        update();
      });
    }
    window.addEventListener("scroll", requestUpdate, { passive: true, capture: true });
    window.addEventListener("resize", requestUpdate);
    document.addEventListener("scroll", requestUpdate, { passive: true, capture: true });
    document.addEventListener("DOMContentLoaded", update);
    setTimeout(update, 0);
    setTimeout(update, 50);
  }

  update();
})();
`;
