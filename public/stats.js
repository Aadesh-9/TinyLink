const API_BASE = "/api/links";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

// Format time
function formatTime(ts) {
  if (!ts) return "Never";
  return new Date(ts).toLocaleString();
}

document.addEventListener("DOMContentLoaded", loadStats);

async function loadStats() {
  const res = await fetch(`${API_BASE}/${code}`);
  const data = await res.json();

  if (!res.ok) {
    document.getElementById("loadingText").classList.add("hidden");
    document.getElementById("errorText").classList.remove("hidden");
    return;
  }

  document.getElementById("loadingText").classList.add("hidden");
  document.getElementById("statsCard").classList.remove("hidden");

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
  };
}

function copyShortUrl() {
  const url = `${window.location.origin}/${code}`;
  navigator.clipboard.writeText(url);
  alert("Copied: " + url);
}

function goBack() {
  window.location.href = "/";
}
