const API_BASE = "/api/links";
let allActiveLinks = []; // store original list

// Format timestamps (simple readable format)
function formatTime(ts) {
  if (!ts) return "Never";
  const date = new Date(ts);
  return date.toLocaleString(); // simple readable format
}

// Search filter function
function filterLinks(query) {
  query = query.toLowerCase();
  return allActiveLinks.filter(
    (link) =>
      link.id.toLowerCase().includes(query) ||
      link.long_url.toLowerCase().includes(query)
  );
}

document.addEventListener("DOMContentLoaded", () => {
  loadLinks();

  document.getElementById("searchInput").addEventListener("input", (e) => {
    const results = filterLinks(e.target.value);
    renderTable(results);
  });
});

// Load & show links
async function loadLinks() {
  const loading = document.getElementById("loadingState");
  const tableWrapper = document.getElementById("linksTableWrapper");
  const table = document.getElementById("linksTable");
  const emptyState = document.getElementById("emptyState");

  loading.classList.remove("hidden");
  tableWrapper.classList.add("hidden");

  const res = await fetch(API_BASE);
  const allLinks = await res.json();

  // Filter out deleted
  allActiveLinks = allLinks.filter((l) => l.is_deleted === false);

  loading.classList.add("hidden");

  if (allActiveLinks.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  tableWrapper.classList.remove("hidden");

  renderTable(allActiveLinks);
}

// Render rows (modular)
function renderTable(list) {
  const table = document.getElementById("linksTable");
  table.innerHTML = "";

  list.forEach((link) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700";

    row.innerHTML = `
      <td class="p-3 text-blue-400 cursor-pointer hover:underline"
          onclick="openStats('${link.id}')">${link.id}</td>

      <td class="p-3 truncate max-w-xs text-gray-300">${link.long_url}</td>

      <td class="p-3">${link.total_clicks}</td>

      <td class="p-3 text-gray-400">${formatTime(link.last_clicked)}</td>

      <td class="p-3">
        <button class="text-red-400 hover:text-red-500" onclick="deleteLink('${
          link.id
        }')">
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

function openStats(code) {
  window.location.href = `/code.html?code=${code}`;
}
