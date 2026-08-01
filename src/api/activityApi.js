const API_BASE = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch {
      error = { message: `HTTP Error ${response.status}: ${response.statusText}` };
    }
    console.error('API Error:', response.status, error);
    throw error;
  }
  if (response.status === 204) return null;
  return response.json();
}

export async function fetchActivities() {
  const response = await fetch(`${API_BASE}/activities`);
  return handleResponse(response);
}

export async function fetchActivitiesByDate(date) {
  const response = await fetch(`${API_BASE}/activities/date/${date}`);
  return handleResponse(response);
}

export async function fetchActivityById(id) {
  const response = await fetch(`${API_BASE}/activities/${id}`);
  return handleResponse(response);
}

export async function createActivity(data) {
  console.log('Creating activity with data:', JSON.stringify(data));
  const response = await fetch(`${API_BASE}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function updateActivity(id, data) {
  console.log('Updating activity', id, 'with data:', JSON.stringify(data));
  const response = await fetch(`${API_BASE}/activities/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(response);
}

export async function deleteActivity(id) {
  const response = await fetch(`${API_BASE}/activities/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
}

export async function fetchDashboardToday() {
  const response = await fetch(`${API_BASE}/dashboard/today`);
  return handleResponse(response);
}

export async function fetchDashboardByDate(date) {
  const response = await fetch(`${API_BASE}/dashboard/${date}`);
  return handleResponse(response);
}

export async function fetchTopics() {
  const response = await fetch(`${API_BASE}/activities/topics`);
  return handleResponse(response);
}

export async function searchActivities(query) {
  const response = await fetch(`${API_BASE}/activities/search?q=${encodeURIComponent(query)}`);
  return handleResponse(response);
}
