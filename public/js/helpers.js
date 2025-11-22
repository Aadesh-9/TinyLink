// helpers.js
// small utilities used by UI

// expose to global scope (non-module)
function formatTime(ts) {
  if (!ts) return "Never";
  return new Date(ts).toLocaleString();
}

// show message in a given element (loading, error, success)
function showMessageElement(el, type, htmlOrText) {
  const styles = {
    loading:
      "mt-4 p-3 rounded text-sm font-medium bg-blue-600/20 text-blue-300 animate-pulse",
    error: "mt-4 p-3 rounded text-sm font-medium bg-red-600/20 text-red-300",
    success:
      "mt-4 p-3 rounded text-sm font-medium bg-green-600/20 text-green-300",
  };

  el.className = styles[type] || styles.error;
  if (htmlOrText && htmlOrText.toString().startsWith("<")) {
    el.innerHTML = htmlOrText;
  } else {
    el.textContent = htmlOrText;
  }
}
