export const wholesaleFormScript = `
(function () {
  if (window.__fttWholesale) return;
  window.__fttWholesale = true;

  var dialog = document.getElementById("wholesale-dialog");
  var form = document.getElementById("wholesale-form");
  var panel = document.getElementById("wholesale-panel");
  var thanks = document.getElementById("wholesale-thanks");
  var saveError = document.getElementById("wholesale-save-error");
  var requiredError = document.getElementById("wholesale-required-error");
  var emailError = document.getElementById("wholesale-email-error");
  var websiteError = document.getElementById("wholesale-website-error");
  var typeError = document.getElementById("wholesale-type-error");
  var hearError = document.getElementById("wholesale-hear-error");
  var button = document.getElementById("wholesale-submit");
  if (!dialog || !form || !panel || !thanks) return;

  var emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  var saving = false;
  var closeTimer = 0;

  function hide(el, hidden) {
    if (!el) return;
    el.hidden = hidden;
  }

  function mark(el, invalid) {
    if (!el) return;
    el.setAttribute("aria-invalid", invalid ? "true" : "false");
  }

  function checkedValues(name) {
    var nodes = form.querySelectorAll('input[name="' + name + '"]:checked');
    var values = [];
    var i;
    for (i = 0; i < nodes.length; i++) values.push(nodes[i].value);
    return values;
  }

  function normalizeUrl(value) {
    var raw = (value || "").trim();
    if (!raw) return "";
    if (!/^https?:\\/\\//i.test(raw)) raw = "https://" + raw;
    try {
      var url = new URL(raw);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      if (!url.hostname || url.hostname.indexOf(".") === -1) return "";
      return url.toString();
    } catch (err) {
      return "";
    }
  }

  function syncReveal() {
    var boxes = form.querySelectorAll("[data-qty-for]");
    var i;
    for (i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      var target = document.getElementById(box.getAttribute("data-qty-for"));
      if (!target) continue;
      var open = box.checked;
      target.classList.toggle("is-open", open);
      if (!open) {
        var qty = target.querySelector("input");
        if (qty) qty.value = "";
      }
    }
    var hear = form.hearAbout;
    var otherWrap = document.getElementById("wholesale-hear-other");
    var isOther = !!(hear && hear.value === "Other");
    if (otherWrap) otherWrap.classList.toggle("is-open", isOther);
    if (!isOther && form.hearAboutOther) form.hearAboutOther.value = "";
  }

  function showForm() {
    panel.hidden = false;
    thanks.hidden = true;
    hide(saveError, true);
    hide(requiredError, true);
    hide(emailError, true);
    hide(websiteError, true);
    hide(typeError, true);
    hide(hearError, true);
    mark(form.fullName, false);
    mark(form.business, false);
    mark(form.website, false);
    mark(form.email, false);
    mark(form.hearAbout, false);
    mark(form.hearAboutOther, false);
    if (button) {
      button.disabled = false;
      button.textContent = "Send inquiry";
    }
    syncReveal();
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
    var first = document.getElementById("wholesale-name");
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

  form.addEventListener("change", syncReveal);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = ((form.fullName && form.fullName.value) || "").trim();
    var business = ((form.business && form.business.value) || "").trim();
    var websiteValue = ((form.website && form.website.value) || "").trim();
    var website = normalizeUrl(websiteValue);
    var email = ((form.email && form.email.value) || "").trim();
    var validEmail = emailOk.test(email);
    var types = checkedValues("businessType");
    var hearAbout = ((form.hearAbout && form.hearAbout.value) || "").trim();
    var hearAboutOther = ((form.hearAboutOther && form.hearAboutOther.value) || "").trim();
    var hearOk = !!hearAbout && (hearAbout !== "Other" || !!hearAboutOther);

    mark(form.fullName, !name);
    mark(form.business, !business);
    mark(form.website, !website);
    mark(form.email, !validEmail);
    mark(form.hearAbout, !hearAbout);
    mark(form.hearAboutOther, hearAbout === "Other" && !hearAboutOther);
    hide(emailError, validEmail);
    hide(websiteError, !websiteValue || !!website);
    hide(typeError, types.length > 0);
    hide(hearError, hearOk);

    var valid = !!(name && business && website && validEmail && types.length && hearOk);
    hide(requiredError, valid);
    if (!valid) {
      var firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid && firstInvalid.focus) firstInvalid.focus();
      return;
    }
    if (saving) return;
    saving = true;
    if (button) {
      button.disabled = true;
      button.textContent = "Sending";
    }
    hide(saveError, true);

    var products = [];
    var productBoxes = form.querySelectorAll('input[name="product"]:checked');
    var i;
    for (i = 0; i < productBoxes.length; i++) {
      var product = productBoxes[i];
      var qtyWrap = document.getElementById(product.getAttribute("data-qty-for"));
      var qtyInput = qtyWrap && qtyWrap.querySelector("input");
      products.push({
        name: product.value,
        quantity: qtyInput ? (qtyInput.value || "").trim() : "",
      });
    }

    fetch("/api/wholesale", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        business: business,
        website: website,
        email: email,
        phone: ((form.phone && form.phone.value) || "").trim(),
        businessTypes: types,
        hearAbout: hearAbout,
        hearAboutOther: hearAboutOther,
        products: products,
        notes: ((form.notes && form.notes.value) || "").trim(),
        hp_website: ((form.hp_website && form.hp_website.value) || "").trim(),
      }),
    })
      .then(function (res) {
        return res.json().then(function (body) {
          if (!res.ok || !body || !body.ok) throw new Error("save failed");
        });
      })
      .then(function () {
        saving = false;
        form.reset();
        syncReveal();
        panel.hidden = true;
        thanks.hidden = false;
        closeTimer = window.setTimeout(function () {
          closeTimer = 0;
          closeDialog();
        }, 3600);
      })
      .catch(function () {
        saving = false;
        if (button) {
          button.disabled = false;
          button.textContent = "Send inquiry";
        }
        hide(saveError, false);
      });
  });
})();
`;
