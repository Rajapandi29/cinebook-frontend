
let accessToken = null;

export function setAccessToken(token) {
  accessToken = token || null;
}

const API = (
  import.meta.env.VITE_API_BASE_URL || "/api"
).replace(/\/$/, "");

export async function api(
  path,
  {
    token,
    method = "GET",
    body,
    headers = {}
  } = {}
) {
  const authToken = token || accessToken;

  const response = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken
        ? { Authorization: `Bearer ${authToken}` }
        : {}),
      ...headers
    },
    ...(body !== undefined
      ? { body: JSON.stringify(body) }
      : {})
  });

  const payload =
    response.status === 204
      ? null
      : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      payload?.error || `Request failed (${response.status})`
    );
  }

  return payload;
}
