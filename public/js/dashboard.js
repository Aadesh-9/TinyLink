// dashboard.js - main logic, wires api + ui

document.addEventListener("DOMContentLoaded", () => {
  // wire search
  const search = document.getElementById("searchInput");
  search.addEventListener("input", (e) => {
    renderTable(filterLinks(e.target.value));
  });

  // wire form
  document
    .getElementById("createForm")
    .addEventListener("submit", createHandler);

  // initial load
  loadLinks();
});

// loadLinks function - global so ui.js can call it
async function loadLinks() {
  const loading = document.getElementById("loadingState");
  const wrapper = document.getElementById("linksTableWrapper");
  const empty = document.getElementById("emptyState");
  const msgEl = document.getElementById("formMessage");

  loading.classList.remove("hidden");
  wrapper.classList.add("hidden");

  try {
    const allLinks = await apiGetLinks();
    // update global state used by ui.js
    allActiveLinks = allLinks.filter((l) => !l.is_deleted);

    loading.classList.add("hidden");

    if (allActiveLinks.length === 0) {
      empty.classList.remove("hidden");
      return;
    }

    empty.classList.add("hidden");
    wrapper.classList.remove("hidden");

    renderTable(allActiveLinks);
  } catch (err) {
    loading.classList.add("hidden");
    showMessageElement(msgEl, "error", "Unable to load links");
  }
}

// create handler
async function createHandler(e) {
  e.preventDefault();
  const long_url = document.getElementById("longUrl").value;
  const custom_code = document.getElementById("customCode").value.trim();
  const msgEl = document.getElementById("formMessage");

  showMessageElement(msgEl, "loading", "⏳ Creating your short link...");

  const body = custom_code ? { long_url, custom_code } : { long_url };
  const result = await apiCreateLink(body);

  if (!result.ok) {
    // show backend error message
    showMessageElement(msgEl, "error", result.data.error || "Server error");
    return;
  }

  const data = result.data;

  // BEAUTIFUL SUCCESS MESSAGE
  msgEl.className =
    "mt-4 p-4 rounded-lg text-sm font-medium bg-green-600/20 text-green-300 border border-green-500/30";

  msgEl.innerHTML = `
    <div class="flex items-center gap-2 mb-2">
      <span class="text-xl">🎉</span>
      <span class="font-semibold">Short link created!</span>
    </div>

    <div class="flex items-center gap-3 mt-1">
      <a href="${data.short_url}" target="_blank"
         class="text-green-400 underline font-semibold break-all">
        ${data.short_url}
      </a>

      <button id="copyBtn"
        class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs border border-gray-600">
        Copy
      </button>
    </div>

    <p id="copyStatus" class="text-green-400 mt-2 hidden">✔ Copied!</p>
  `;

  // Copy Button Behavior
  document.getElementById("copyBtn").onclick = () => {
    navigator.clipboard.writeText(data.short_url);
    const status = document.getElementById("copyStatus");
    status.classList.remove("hidden");

    setTimeout(() => {
      status.classList.add("hidden");
    }, 1500);
  };

  // reset form & reload table
  document.getElementById("longUrl").value = "";
  document.getElementById("customCode").value = "";
  loadLinks();
}
