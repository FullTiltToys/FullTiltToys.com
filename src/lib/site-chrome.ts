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
    return nav.querySelectorAll(".site-nav-button");
  }

  var flipGen = 0;
  var dockEase = "cubic-bezier(0.22, 1, 0.36, 1)";
  var dockMs = 840;

  function cancelAnims(el) {
    var running = el.getAnimations();
    var a;
    for (a = 0; a < running.length; a++) running[a].cancel();
  }

  function invertTransform(first, last) {
    var dx = first.left + first.width / 2 - (last.left + last.width / 2);
    var dy = first.top + first.height / 2 - (last.top + last.height / 2);
    var sx = last.width ? first.width / last.width : 1;
    var sy = last.height ? first.height / last.height : 1;
    return {
      dx: dx,
      dy: dy,
      sx: sx,
      sy: sy,
      idle:
        Math.abs(dx) < 0.4 &&
        Math.abs(dy) < 0.4 &&
        Math.abs(sx - 1) < 0.02 &&
        Math.abs(sy - 1) < 0.02,
    };
  }

  function playFlip(el, first, last, fromExtra, toExtra) {
    var inv = invertTransform(first, last);
    if (inv.idle) return null;
    cancelAnims(el);
    return el.animate(
      [
        Object.assign(
          {
            transform:
              "translate(" +
              inv.dx +
              "px, " +
              inv.dy +
              "px) scale(" +
              inv.sx +
              ", " +
              inv.sy +
              ")",
          },
          fromExtra || {}
        ),
        Object.assign(
          { transform: "translate(0px, 0px) scale(1, 1)" },
          toExtra || {}
        ),
      ],
      { duration: dockMs, easing: dockEase, fill: "both" }
    );
  }

  function navVeil() {
    var node = document.querySelector(".site-nav-veil");
    if (!node) {
      node = document.createElement("div");
      node.className = "site-nav-veil";
      document.body.appendChild(node);
    }
    return node;
  }

  function placeVeil(node, rect) {
    node.style.left = rect.left + "px";
    node.style.top = rect.top + "px";
    node.style.width = rect.width + "px";
    node.style.height = rect.height + "px";
  }

  function flipDock(nav, docked) {
    var els = dockItems(nav);
    var token = ++flipGen;
    var first = [];
    var firstNav = nav.getBoundingClientRect();
    var i;
    for (i = 0; i < els.length; i++) {
      first.push(els[i].getBoundingClientRect());
    }

    if (reduceMotion()) {
      nav.classList.toggle("is-docked", docked);
      nav.classList.remove("is-flipping", "is-measuring");
      var oldVeil = document.querySelector(".site-nav-veil");
      if (oldVeil) oldVeil.remove();
      return;
    }

    nav.classList.add("is-measuring", "is-flipping");
    nav.classList.toggle("is-docked", docked);
    void nav.offsetWidth;

    var last = [];
    var lastNav = nav.getBoundingClientRect();
    for (i = 0; i < els.length; i++) {
      last.push(els[i].getBoundingClientRect());
    }

    nav.classList.remove("is-measuring");

    var veil = navVeil();
    placeVeil(veil, lastNav);
    var pending = 0;
    function finished() {
      if (token !== flipGen) return;
      pending -= 1;
      if (pending > 0) return;
      nav.classList.remove("is-flipping");
      if (veil.parentNode) veil.remove();
    }
    function track(anim) {
      if (!anim) return;
      pending += 1;
      anim.onfinish = finished;
      anim.oncancel = finished;
    }

    track(
      playFlip(
        veil,
        firstNav,
        lastNav,
        { opacity: docked ? 1 : 0 },
        { opacity: docked ? 0 : 1 }
      )
    );

    for (i = 0; i < els.length; i++) {
      els[i].style.transformOrigin = "center center";
      track(playFlip(els[i], first[i], last[i]));
    }

    if (pending === 0) {
      pending = 1;
      finished();
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
