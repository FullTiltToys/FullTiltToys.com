export const wholesaleFormScript = `
(function () {
  if (window.__fttWholesale) return;
  window.__fttWholesale = true;

  var dialog = document.getElementById("wholesale-dialog");
  var form = document.getElementById("wholesale-form");
  var panel = document.getElementById("wholesale-panel");
  var thanks = document.getElementById("wholesale-thanks");
  var saveError = document.getElementById("wholesale-save-error");
  var emailError = document.getElementById("wholesale-email-error");
  var button = document.getElementById("wholesale-submit");
  if (!dialog || !form || !panel || !thanks) return;

  var emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  var saving = false;
  var closeTimer = 0;

  function showForm() {
    panel.hidden = false;
    thanks.hidden = true;
    if (saveError) saveError.hidden = true;
    if (emailError) emailError.hidden = true;
    if (form.email) form.email.removeAttribute("aria-invalid");
    if (button) {
      button.disabled = false;
      button.textContent = "Send";
    }
  }

  function openDialog() {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = 0;
    }
    form.reset();
    showForm();
    if (dialog.showModal) dialog.showModal();
    else dialog.setAttribute("open", "");
    var first = form.querySelector("input:not([type='hidden'])");
    if (first && first.focus) first.focus();
  }

  function closeDialog() {
    if (dialog.close) dialog.close();
    else dialog.removeAttribute("open");
    form.reset();
    showForm();
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (!target || !target.closest) return;
    if (target.closest("[data-wholesale-open]")) {
      event.preventDefault();
      openDialog();
      return;
    }
    if (target.closest("[data-wholesale-close]")) {
      event.preventDefault();
      closeDialog();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", function () {
    if (closeTimer) {
      window.clearTimeout(closeTimer);
      closeTimer = 0;
    }
    form.reset();
    showForm();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = ((form.fullName && form.fullName.value) || "").trim();
    var business = ((form.business && form.business.value) || "").trim();
    var email = ((form.email && form.email.value) || "").trim();
    var validEmail = emailOk.test(email);
    if (emailError) emailError.hidden = validEmail;
    if (form.email) form.email.setAttribute("aria-invalid", validEmail ? "false" : "true");
    if (!name || !business || !validEmail) {
      if (!validEmail && emailError) emailError.hidden = false;
      return;
    }
    if (saving) return;
    saving = true;
    if (button) {
      button.disabled = true;
      button.textContent = "Sending";
    }
    if (saveError) saveError.hidden = true;

    fetch("/api/wholesale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        business: business,
        email: email,
        phone: ((form.phone && form.phone.value) || "").trim(),
        message: ((form.message && form.message.value) || "").trim(),
        website: ((form.website && form.website.value) || "").trim(),
      }),
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok || !body || !body.ok) throw new Error("save failed");
        });
      })
      .then(function () {
        saving = false;
        panel.hidden = true;
        thanks.hidden = false;
        closeTimer = window.setTimeout(function () {
          closeTimer = 0;
          closeDialog();
        }, 2400);
      })
      .catch(function () {
        saving = false;
        if (button) {
          button.disabled = false;
          button.textContent = "Send";
        }
        if (saveError) saveError.hidden = false;
      });
  });
})();
`;
