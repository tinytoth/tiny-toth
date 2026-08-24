const SUBMIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwmNOPZ3AjUMecHQ9cMZEftdk_QN-_OzI1_AsLDpRyPaiB6i5AUHcOsIWpo7oACI4tB/exec";

const form = document.getElementById("wl");
const status = document.getElementById("status");
const submitButton = form?.querySelector('button[type="submit"]');

function showShare(username) {
  // Remove any old share sections so only one can exist
  document.querySelectorAll(
    "#tinyTothShare, .tiny-toth-share, .share-section, .share-card"
  ).forEach(el => el.remove());

  const share = document.createElement("div");
  share.id = "tinyTothShare";
  share.className = "tiny-toth-share";

  const tweetText =
`just joined the Tiny Toth early access list.

tiny characters. big variations.
built on @inkonchain

waiting for the reveal.`;

  const xUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(tweetText);

  share.innerHTML = `
    <div class="share-inner">
      <strong>early access secured</strong>
      <p>share your spot on x</p>
      <a class="share-x-btn"
         href="${xUrl}"
         target="_blank"
         rel="noopener noreferrer">
         X SHARE ON X
      </a>
    </div>
  `;

  form.parentElement.appendChild(share);
}

if (form && status) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const wallet =
      document.getElementById("wallet")?.value.trim() || "";

    const username =
      document.getElementById("user")?.value.trim() || "";

    const commentLink =
      document.getElementById("comment_link")?.value.trim() || "";

    const quoteLink =
      document.getElementById("quote_link")?.value.trim() || "";

    if (!username) {
      status.textContent = "Please enter your X username.";
      return;
    }

    if (!/^0x[a-fA-F0-9]{20,}$/.test(wallet)) {
      status.textContent = "Please enter a valid public wallet address.";
      return;
    }

    if (!commentLink || !quoteLink) {
      status.textContent =
        "Please add your comment and quote tweet links.";
      return;
    }

    const requiredSteps = ["follow", "like", "comment", "quote"];

    if (!requiredSteps.every(id =>
      document.getElementById(id)?.checked
    )) {
      status.textContent =
        "Please complete all required campaign steps.";
      return;
    }

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

    if (submitButton) {
      submitButton.disabled = true;
    }

    HTMLFormElement.prototype.submit.call(form);

    setTimeout(() => {
      status.textContent = "Early access secured.";

      form.reset();

      if (submitButton) {
        submitButton.disabled = false;
      }

      if (oldAction === null) {
        form.removeAttribute("action");
      } else {
        form.setAttribute("action", oldAction);
      }

      if (oldMethod === null) {
        form.removeAttribute("method");
      } else {
        form.setAttribute("method", oldMethod);
      }

      if (oldTarget === null) {
        form.removeAttribute("target");
      } else {
        form.setAttribute("target", oldTarget);
      }

      showShare(username);

    }, 1200);
  });
}