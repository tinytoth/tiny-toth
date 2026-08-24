const SUBMIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwmNOPZ3AjUMecHQ9cMZEftdk_QN-_OzI1_AsLDpRyPaiB6i5AUHcOsIWpo7oACI4tB/exec";

const form = document.getElementById("wl");
const status = document.getElementById("status");
const submitButton = form?.querySelector('button[type="submit"]');

if (form && status) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const wallet = document.getElementById("wallet")?.value.trim() || "";
    const username = document.getElementById("user")?.value.trim() || "";
    const commentLink = document.getElementById("comment_link")?.value.trim() || "";
    const quoteLink = document.getElementById("quote_link")?.value.trim() || "";

    if (!username) {
      status.textContent = "Please enter your X username.";
      return;
    }

    if (!/^0x[a-fA-F0-9]{20,}$/.test(wallet)) {
      status.textContent = "Please enter a valid public wallet address.";
      return;
    }

    if (!commentLink || !quoteLink) {
      status.textContent = "Please add your comment and quote tweet links.";
      return;
    }

    if (!["follow", "like", "comment", "quote"].every(id => document.getElementById(id)?.checked)) {
      status.textContent = "Please complete all required campaign steps.";
      return;
    }

    // Submit as a normal HTML form to a hidden iframe.
    // This avoids browser CORS/preflight problems with Google Apps Script.
    let frame = document.getElementById("tinyTothSubmitFrame");
    if (!frame) {
      frame = document.createElement("iframe");
      frame.name = "tinyTothSubmitFrame";
      frame.id = "tinyTothSubmitFrame";
      frame.style.display = "none";
      document.body.appendChild(frame);
    }

    const oldAction = form.getAttribute("action");
    const oldMethod = form.getAttribute("method");
    const oldTarget = form.getAttribute("target");

    form.action = SUBMIT_ENDPOINT;
    form.method = "POST";
    form.target = "tinyTothSubmitFrame";

    status.textContent = "Submitting...";
    if (submitButton) submitButton.disabled = true;

    // Native form submission sends application/x-www-form-urlencoded,
    // which is exactly what the Apps Script doPost expects.
    HTMLFormElement.prototype.submit.call(form);

    // Apps Script may redirect inside the iframe, so don't try to read its response.
    // The submission has been sent successfully once the browser accepts the POST.
    setTimeout(() => {
      status.textContent = "Submitted. Your early access spot is recorded.";
      form.reset();
      if (submitButton) submitButton.disabled = false;

      if (oldAction === null) form.removeAttribute("action"); else form.setAttribute("action", oldAction);
      if (oldMethod === null) form.removeAttribute("method"); else form.setAttribute("method", oldMethod);
      if (oldTarget === null) form.removeAttribute("target"); else form.setAttribute("target", oldTarget);
    }, 900);
  });
}
