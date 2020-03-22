const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const BASE_URL = isLocal ? "http://localhost:3001" : '';