(() => {
  const status = document.getElementById("status");
  const form = document.getElementById("wl");
  if (!status || !form) return;

  let shown = false;

  const isSuccess = (text) => {
    const t = String(text || "").toLowerCase();
    return /submitted|registered|secured|success|you're on the list|you are on the list|early access/.test(t)
      && !/wrong|error|invalid|failed|please enter/.test(t);
  };

  const showShare = () => {
    if (shown) return;
    shown = true;

    const shareText =
`just joined the Tiny Toth early access list.

tiny characters. big variations.
built on @inkonchain

waiting for the reveal.`;

    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(
      `${shareText}\n\n${shareUrl}`
    )}`;

    const box = document.createElement("div");
    box.className = "tt-share-card";
    box.innerHTML = `
      <div class="tt-share-title">early access secured</div>
      <div class="tt-share-copy">share your spot on x and let the Tiny Toth journey begin.</div>
      <a class="tt-share-btn" href="${xUrl}" target="_blank" rel="noopener noreferrer">
        𝕏&nbsp; share on x
      </a>
    `;

    form.appendChild(box);
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const observer = new MutationObserver(() => {
    if (isSuccess(status.textContent)) showShare();
  });

  observer.observe(status, { childList: true, characterData: true, subtree: true });
})();
