const API_BASE = "/api/links";

// Load all links on page load
document.addEventListener("DOMContentLoaded", loadLinks);

// Handle new link creation
document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating...";

  const long_url = document.getElementById("longUrl").value;
  const custom_code =
    document.getElementById("customCode").value.trim() || null;

  const body = custom_code ? { long_url, custom_code } : { long_url };

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  const msg = document.getElementById("formMessage");

  if (!res.ok) {
    msg.textContent = "❌ " + data.error;
    msg.className = "text-red-400 text-sm";
  } else {
    msg.textContent = "✅ Created: " + data.short_url;
    msg.className = "text-green-400 text-sm";
    document.getElementById("createForm").reset();
    loadLinks();
  }

  submitBtn.disabled = false;
  submitBtn.textContent = "Shorten";
});

// Load all links
async function loadLinks() {
  const res = await fetch(API_BASE);
  const links = await res.json();

  const table = document.getElementById("linksTable");
  const emptyState = document.getElementById("emptyState");

  table.innerHTML = "";

  if (links.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  links.forEach((link) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700";

    row.innerHTML = `
      <td class="p-3 text-blue-400 cursor-pointer hover:underline" onclick="openStats('${link.id}')">
        ${link.id}
      </td>

      <td class="p-3 truncate max-w-xs text-gray-300">
        ${link.long_url}
      </td>

      <td class="p-3">${link.total_clicks}</td>

      <td class="p-3">
        <button class="text-red-400 hover:text-red-500" onclick="deleteLink('${link.id}')">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

// Delete link
async function deleteLink(code) {
  await fetch(`${API_BASE}/${code}`, { method: "DELETE" });
  loadLinks();
}

// Open stats page
function openStats(code) {
  window.location.href = `/code.html?code=${code}`;
}
