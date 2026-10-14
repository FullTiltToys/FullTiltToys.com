export const subscribeDozerScript = `
(function () {
  var form = document.getElementById("subscribe-form");
  var emailError = document.getElementById("email-error");
  var listError = document.getElementById("list-error");
  var scene = document.getElementById("subscribe-scene");
  var panel = document.getElementById("subscribe-panel");
  var dozerOut = document.getElementById("dozer-out");
  var dozerBack = document.getElementById("dozer-back");
  var thanks = document.getElementById("subscribe-thanks");
  var button = document.getElementById("subscribe-btn");
  var saveError = document.getElementById("subscribe-save-error");
  if (!form || !emailError || !listError || !scene || !panel || !dozerOut || !dozerBack) return;

  var emailOk = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  var playing = false;
  var saving = false;

  function selectedList() {
    return form.querySelector('input[name="mailing-list"]:checked');
  }

  function reduceMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function run(el, keyframes, options) {
    return el.animate(keyframes, Object.assign({ fill: "forwards" }, options)).finished;
  }

  function markSubscribed() {
    if (!button) return;
    button.classList.add("is-subscribed");
    button.textContent = "subscribed";
  }

  function clearForm() {
    form.reset();
    emailError.hidden = true;
    listError.hidden = true;
    if (saveError) saveError.hidden = true;
    if (form.email) form.email.removeAttribute("aria-invalid");
    if (button) {
      button.disabled = false;
      button.classList.remove("is-subscribed");
      button.textContent = "Subscribe";
    }
  }

  function hideDozers() {
    dozerOut.classList.remove("is-visible");
    dozerBack.classList.remove("is-visible");
    dozerOut.style.transform = "";
    dozerBack.style.transform = "";
    panel.style.transform = "";
  }

  function playDozer() {
    if (playing) return;
    playing = true;
    scene.classList.add("is-busy");

    if (reduceMotion()) {
      clearForm();
      if (thanks) {
        thanks.hidden = false;
        form.hidden = true;
      }
      playing = false;
      scene.classList.remove("is-busy");
      return;
    }

    var sceneBox = scene.getBoundingClientRect();
    var panelW = panel.offsetWidth;
    var outW = dozerOut.offsetWidth;
    var backW = dozerBack.offsetWidth;
    var travel = window.innerWidth - sceneBox.left + outW + 80;

    var outStart = -outW - 48;
    var outContact = -outW + 22;
    var outPush = outContact + travel;
    var offX = travel;
    var backPush = offX + panelW - 20;
    var backHome = panelW - 20;
    var backExit = offX + backW + 40;

    dozerOut.style.transform = "translateX(" + outStart + "px)";
    dozerBack.style.transform = "translateX(" + (backPush + backW) + "px)";
    panel.style.transform = "translateX(0)";
    dozerOut.classList.add("is-visible");

    run(dozerOut, [{ transform: "translateX(" + outStart + "px)" }, { transform: "translateX(" + outContact + "px)" }], {
      duration: 2200,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    })
      .then(function () {
        return Promise.all([
          run(dozerOut, [{ transform: "translateX(" + outContact + "px)" }, { transform: "translateX(" + outPush + "px)" }], {
            duration: 4500,
            easing: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          }),
          run(panel, [{ transform: "translateX(0)" }, { transform: "translateX(" + offX + "px)" }], {
            duration: 4500,
            easing: "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
          }),
        ]);
      })
      .then(function () {
        dozerOut.classList.remove("is-visible");
        clearForm();
        dozerBack.classList.add("is-visible");
        dozerBack.style.transform = "translateX(" + backPush + "px)";
        return new Promise(function (resolve) {
          window.setTimeout(resolve, 350);
        });
      })
      .then(function () {
        return Promise.all([
          run(dozerBack, [{ transform: "translateX(" + backPush + "px)" }, { transform: "translateX(" + backHome + "px)" }], {
            duration: 1300,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }),
          run(panel, [{ transform: "translateX(" + offX + "px)" }, { transform: "translateX(0)" }], {
            duration: 1300,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          }),
        ]);
      })
      .then(function () {
        scene.classList.remove("is-busy");
        return new Promise(function (resolve) {
          window.setTimeout(resolve, 400);
        });
      })
      .then(function () {
        return run(dozerBack, [{ transform: "translateX(" + backHome + "px)" }, { transform: "translateX(" + backExit + "px)" }], {
          duration: 12000,
          easing: "linear",
        });
      })
      .then(function () {
        hideDozers();
        playing = false;
      })
      .catch(function () {
        hideDozers();
        scene.classList.remove("is-busy");
        playing = false;
      });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = ((form.email && form.email.value) || "").trim();
    var validEmail = emailOk.test(email);
    var hasList = !!selectedList();
    var list = selectedList();
    emailError.hidden = validEmail;
    listError.hidden = hasList;
    if (saveError) saveError.hidden = true;
    if (form.email) form.email.setAttribute("aria-invalid", validEmail ? "false" : "true");
    if (!validEmail || !hasList || !list) return;
    if (saving || playing) return;
    saving = true;
    if (button) button.disabled = true;
    fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: ((form.firstName && form.firstName.value) || "").trim(),
        lastName: ((form.lastName && form.lastName.value) || "").trim(),
        email: email,
        list: list.value,
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
        markSubscribed();
        playDozer();
      })
      .catch(function () {
        saving = false;
        if (button) button.disabled = false;
        if (saveError) saveError.hidden = false;
      });
  });

  form.email &&
    form.email.addEventListener("input", function () {
      if (!emailError.hidden) emailError.hidden = emailOk.test((form.email.value || "").trim());
    });

  form.addEventListener("change", function (event) {
    if (event.target && event.target.name === "mailing-list" && !listError.hidden) {
      listError.hidden = !!selectedList();
    }
  });
})();
`;
