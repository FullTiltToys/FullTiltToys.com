export const siteChromeScript = `
(function () {
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
})();
`;
