const API_BASE = '/api/settings';

async function handleResponse(response) {
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: `HTTP Error ${response.status}: ${response.statusText}` };
    }
    console.error('Settings API Error:', response.status, error);
    throw error;
  }
  return response.json();
}

export async function fetchSettings() {
  const response = await fetch(API_BASE);
  return handleResponse(response);
}

export async function updateTheme(theme) {
  const response = await fetch(`${API_BASE}/theme`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ theme }),
  });
  return handleResponse(response);
}

export async function updateAccentColor(accentColor) {
  const response = await fetch(`${API_BASE}/accent`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accentColor }),
  });
  return handleResponse(response);
}

export async function updateFontSize(fontSize) {
  const response = await fetch(`${API_BASE}/font-size`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fontSize }),
  });
  return handleResponse(response);
}
