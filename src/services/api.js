let accessToken = null;\nexport function setAccessToken(token) { accessToken = token || null; }\n\nconst API = (import.meta.env.VITE_API_BASE_URL || "/api").replace(/\/$/, "");

export async function api(path, { token, method = "GET", body, headers = {} } = {}) {
  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...((token || accessToken) ? { Authorization: `Bearer ${token || accessToken}` } : {}),
      ...headers
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {})
  });
  const payload = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.error || `Request failed (${response.status})`);
  return payload;
}