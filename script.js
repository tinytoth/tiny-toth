const SUBMIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwmNOPZ3AjUMecHQ9cMZEftdk_QN-_OzI1_AsLDpRyPaiB6i5AUHcOsIWpo7oACI4tB/exec";

const form = document.getElementById("wl");
const status = document.getElementById("status");

function validWallet(value) {
  return /^0x[a-fA-F0-9]{20,}$/.test(value.trim());
}

function validXUrl(value) {
  try {
    const url = new URL(value.trim());
    return url.hostname === "x.com" || url.hostname === "twitter.com" || url.hostname === "www.x.com" || url.hostname === "www.twitter.com";
  } catch {
    return false;
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("user").value.trim();
  const wallet = document.getElementById("wallet").value.trim();
  const commentLink = document.getElementById("comment_link").value.trim();
  const quoteLink = document.getElementById("quote_link").value.trim();

  if (!validWallet(wallet)) {
    status.textContent = "Please enter a valid public wallet address.";
    return;
  }

  if (!validXUrl(commentLink) || !validXUrl(quoteLink)) {
    status.textContent = "Please use valid X/Twitter links for your comment and quote.";
    return;
  }

  // Apps Script Web Apps can be cross-origin. We submit as a normal
  // application/x-www-form-urlencoded POST to a hidden iframe, avoiding
  // browser CORS restrictions.
  const submitForm = document.createElement("form");
  submitForm.method = "POST";
  submitForm.action = SUBMIT_ENDPOINT;
  submitForm.target = "tinyTothSubmitFrame";
  submitForm.style.display = "none";

  const values = {
    username: username.startsWith("@") ? username : "@" + username,
    wallet,
    comment_link: commentLink,
    quote_link: quoteLink,
    follow: document.getElementById("follow").checked ? "true" : "false",
    like: document.getElementById("like").checked ? "true" : "false",
    comment: document.getElementById("comment").checked ? "true" : "false",
    quote: document.getElementById("quote").checked ? "true" : "false"
  };

  for (const [name, value] of Object.entries(values)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    submitForm.appendChild(input);
  }

  document.body.appendChild(submitForm);
  status.textContent = "Submitting...";
  submitForm.submit();

  // The endpoint is intentionally submitted without exposing API/CORS
  // internals to the visitor. The server records the row in Google Sheets.
  setTimeout(() => {
    form.reset();
    status.textContent = "Submitted. Keep an eye on Tiny Toth.";
    submitForm.remove();
  }, 1200);
});
