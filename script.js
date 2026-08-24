const SUBMIT_ENDPOINT = "https://script.google.com/macros/s/AKfycbwmNOPZ3AjUMecHQ9cMZEftdk_QN-_OzI1_AsLDpRyPaiB6i5AUHcOsIWpo7oACI4tB/exec";

const form = document.getElementById("wl");
const status = document.getElementById("status");
const submitButton = form?.querySelector('button[type="submit"]');

function showShare() {
  document.querySelectorAll(
    "#tinyTothShare, .tiny-toth-share, .share-section, .share-card"
  ).forEach(el => el.remove());

  const share = document.createElement("div");

  share.id = "tinyTothShare";

  share.style.marginTop = "28px";
  share.style.width = "100%";
  share.style.boxSizing = "border-box";
  share.style.padding = "24px";
  share.style.border = "1px solid rgba(255,255,255,0.10)";
  share.style.borderRadius = "20px";
  share.style.background = "linear-gradient(135deg, rgba(30,28,48,0.95), rgba(18,17,27,0.95))";
  share.style.boxShadow = "0 20px 60px rgba(0,0,0,0.25)";

  const tweetText =
`just joined the Tiny Toth early access list.

tiny characters. big variations.
built on @inkonchain

waiting for the reveal.`;

  const xUrl =
    "https://x.com/intent/tweet?text=" +
    encodeURIComponent(tweetText);

  share.innerHTML = `
    <strong style="
      display:block;
      margin-bottom:8px;
      color:#fff;
      font-size:18px;
      font-weight:700;
    ">
      early access secured
    </strong>

    <p style="
      margin:0 0 18px;
      color:#9c9aaa;
      font-size:14px;
      line-height:1.6;
    ">
      share your spot on x and let the Tiny Toth journey begin.
    </p>

    <a href="${xUrl}"
       target="_blank"
       rel="noopener noreferrer"
       style="
         display:inline-flex;
         align-items:center;
         justify-content:center;
         padding:13px 20px;
         border-radius:12px;
         background:#fff;
         color:#08080b;
         text-decoration:none;
         font-size:13px;
         font-weight:800;
       ">
      X SHARE ON X
    </a>
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

    const follow =
      document.getElementById("follow")?.checked || false;

    const like =
      document.getElementById("like")?.checked || false;

    const comment =
      document.getElementById("comment")?.checked || false;

    const quote =
      document.getElementById("quote")?.checked || false;

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

    if (!follow || !like || !comment || !quote) {
      status.textContent =
        "Please complete all required campaign steps.";
      return;
    }

    let iframe = document.getElementById("tinyTothSubmitFrame");

    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "tinyTothSubmitFrame";
      iframe.name = "tinyTothSubmitFrame";
      iframe.style.display = "none";
      document.body.appendChild(iframe);
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

      showShare();

    }, 1500);
  });
}