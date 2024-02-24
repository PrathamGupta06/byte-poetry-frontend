const AUTH_TOKEN_KEY = 'accessToken';

export function isAuthenticated() {
  const accessToken = localStorage.getItem(AUTH_TOKEN_KEY);
  return !!accessToken;
}