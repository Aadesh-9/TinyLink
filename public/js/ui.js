// ui.js - rendering helpers and handlers (uses helpers.js for formatTime/showMessageElement)

let allActiveLinks = []; // local state

function filterLinks(query) {
  query = (query || "").toLowerCase();
  return allActiveLinks.filter(
    (l) =>
      l.id.toLowerCase().includes(query) ||
      l.long_url.toLowerCase().includes(query)
  );
}

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
        <button class="text-red-400 hover:text-red-500" onclick="deleteLinkHandler('${
          link.id
        }')">
          Delete
        </button>
      </td>
    `;

    table.appendChild(row);
  });
}

// expose functions used by HTML/onclick
window.openStats = function (code) {
  window.location.href = `/code/${code}`;
};

window.deleteLinkHandler = async function (code) {
  const ok = await apiDeleteLink(code);
  // optional: show a quick feedback
  const msgEl = document.getElementById("formMessage");
  if (ok) {
    showMessageElement(msgEl, "success", "Link deleted");
  } else {
    showMessageElement(msgEl, "error", "Delete failed");
  }
  // refresh list
  loadLinks(); // defined in dashboard.js (global)
};
