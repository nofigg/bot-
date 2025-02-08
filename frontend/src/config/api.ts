export const API_BASE_URL = 'http://localhost:4000';

export const API_ENDPOINTS = {
  register: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  botConfigure: `${API_BASE_URL}/bot/configure`,
  qrGenerate: `${API_BASE_URL}/qr/generate`,
  chatbot: `${API_BASE_URL}/chatbot`,
};
