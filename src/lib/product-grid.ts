export const productGridScript = `
(function () {
  if (window.__fttProductGrid) return;
  window.__fttProductGrid = true;

  function openDialog(dialog) {
    if (!dialog) return;
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    if (dialog.close) dialog.close();
    else dialog.removeAttribute("open");
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    var opener = target.closest("[data-product-open]");
    if (opener) {
      event.preventDefault();
      var slug = opener.getAttribute("data-product-open");
      if (!slug || slug === "oto" || slug === "oto-stainless") return;
      var dialog = document.getElementById("product-dialog-" + slug);
      if (!dialog) return;
      openDialog(dialog);
      return;
    }
    var closer = target.closest("[data-product-close]");
    if (closer) {
      event.preventDefault();
      closeDialog(closer.closest("dialog"));
    }
  });

  var dialogs = document.querySelectorAll(".product-dialog");
  var i;
  for (i = 0; i < dialogs.length; i++) {
    dialogs[i].addEventListener("click", function (event) {
      if (event.target === this) closeDialog(this);
    });
  }
})();
`;
