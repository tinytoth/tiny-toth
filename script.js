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
      <p>share your spot on x and let the Tiny Toth journey begin.</p>
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
  form.addEventListener("submit", async (e) => {
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

    const body = new URLSearchParams();

    body.append("username", username);
    body.append("wallet", wallet);
    body.append("comment_link", commentLink);
    body.append("quote_link", quoteLink);
    body.append("follow", "true");
    body.append("like", "true");
    body.append("comment", "true");
    body.append("quote", "true");

    status.textContent = "Submitting...";

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: body.toString()
      });

      status.textContent = "Early access secured.";

      form.reset();

      showShare();

    } catch (error) {
      console.error(error);

      status.textContent =
        "Submission failed. Please try again.";

    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}