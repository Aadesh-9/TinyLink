// api.js - small wrapper for backend calls
const API_BASE = "/api/links";

async function apiGetLinks() {
  const res = await fetch(API_BASE);
  return res.json();
}

async function apiCreateLink(body) {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

async function apiDeleteLink(code) {
  const res = await fetch(`${API_BASE}/${code}`, { method: "DELETE" });
  return res.ok;
}

async function apiGetLinkDetails(code) {
  const res = await fetch(`${API_BASE}/${code}`);
  return { ok: res.ok, data: await res.json() };
}
