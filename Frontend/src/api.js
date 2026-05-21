const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const getToken  = ()        => localStorage.getItem('pf_token');
export const setToken  = (token)   => localStorage.setItem('pf_token', token);
export const clearToken = ()       => localStorage.removeItem('pf_token');
async function request(path, options = {}) {
  const token = getToken();
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...options,
    });

    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { message: `Server error: ${res.status}` };
    }

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with status ${res.status}`;
      console.error('API Error:', { status: res.status, errorMsg, data });
      throw new Error(errorMsg);
    }
    return data;
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}

export const authAPI = {
  register: async (name, email, password) => {
    const data = await request('/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    setToken(data.token);  
    return data;
  },

  login: async (email, password) => {
    const data = await request('/users/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setToken(data.token);
    return data;
  },

  logout: () => clearToken(),

  me: () => request('/users/me'),
};

export const teamsAPI = {
  getAll:        ()           => request('/teams'),
  getOne:        (id)         => request(`/teams/${id}`),
  create:        (data)       => request('/teams', { method: 'POST', body: JSON.stringify(data) }),
  update:        (id, data)   => request(`/teams/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:        (id)         => request(`/teams/${id}`, { method: 'DELETE' }),
  addMember:     (id, memberId) => request(`/teams/${id}/members`, { method: 'POST', body: JSON.stringify({ memberId }) }),
  removeMember:  (id, memberId) => request(`/teams/${id}/members`, { method: 'DELETE', body: JSON.stringify({ memberId }) }),
};

export const projectsAPI = {
  getAll:        ()           => request('/projects/user/all'),
  getTeamProjects: (teamId)   => request(`/projects/team/${teamId}`),
  getOne:        (id)         => request(`/projects/${id}`),
  create:        (teamId, data) => request(`/projects/team/${teamId}`, { method: 'POST', body: JSON.stringify(data) }),
  update:        (id, data)   => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:        (id)         => request(`/projects/${id}`, { method: 'DELETE' }),
};

export const tasksAPI = {
  getAll:        ()           => request('/tasks/user/all'),
  getProjectTasks: (projectId) => request(`/tasks/project/${projectId}`),
  getOne:        (id)         => request(`/tasks/${id}`),
  create:        (projectId, data) => request(`/tasks/project/${projectId}`, { method: 'POST', body: JSON.stringify(data) }),
  update:        (id, data)   => request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete:        (id)         => request(`/tasks/${id}`, { method: 'DELETE' }),
};