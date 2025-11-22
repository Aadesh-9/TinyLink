// stats.js - stats page logic (uses helpers.js)

document.addEventListener("DOMContentLoaded", loadStats);

async function loadStats() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  const loading = document.getElementById("loadingText");
  const error = document.getElementById("errorText");
  const card = document.getElementById("statsCard");

  loading.classList.remove("hidden");
  error.classList.add("hidden");
  card.classList.add("hidden");

  try {
    const res = await fetch(`/api/links/${code}`);
    const data = await res.json();

    if (!res.ok) {
      loading.classList.add("hidden");
      error.classList.remove("hidden");
      return;
    }

    // populate
    loading.classList.add("hidden");
    card.classList.remove("hidden");

    document.getElementById("codeTitle").textContent = `Stats for: ${data.id}`;
    document.getElementById("longUrl").textContent = data.long_url;
    document.getElementById("clicks").textContent = data.total_clicks;
    document.getElementById("lastClicked").textContent = formatTime(
      data.last_clicked
    );
    document.getElementById("createdAt").textContent = formatTime(
      data.created_at
    );

    document.getElementById("openLinkBtn").onclick = () => {
      window.open(`/${data.id}`, "_blank");
      // optional small refresh when returning using visibility API handled below
    };

    document.getElementById("copyBtn").onclick = () => {
      const short = `${window.location.origin}/${data.id}`;
      navigator.clipboard.writeText(short);
      alert("Copied: " + short);
    };

    // refresh stats when user returns to tab (helpful after opening link)
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        loadStats();
      }
    });
  } catch (err) {
    loading.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

function goBack() {
  window.location.href = "/";
}
