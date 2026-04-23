const ACCESS_TOKEN_KEY = "trademandu.accessToken";
const REFRESH_TOKEN_KEY = "trademandu.refreshToken";
const USER_KEY = "trademandu.user";
const THEME_KEY = "trademandu.theme";

export const storage = {
  getAccessToken: () => (typeof window === "undefined" ? null : localStorage.getItem(ACCESS_TOKEN_KEY)),
  setAccessToken: (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  clearAccessToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: () => (typeof window === "undefined" ? null : localStorage.getItem(REFRESH_TOKEN_KEY)),
  setRefreshToken: (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  clearRefreshToken: () => {
    if (typeof window !== "undefined") localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
  getUser: () => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  setUser: (user: unknown) => {
    if (typeof window !== "undefined") localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearUser: () => {
    if (typeof window !== "undefined") localStorage.removeItem(USER_KEY);
  },
  getTheme: () => (typeof window === "undefined" ? null : localStorage.getItem(THEME_KEY)),
  setTheme: (theme: string) => {
    if (typeof window !== "undefined") localStorage.setItem(THEME_KEY, theme);
  },
  clearAll: () => {
    storage.clearAccessToken();
    storage.clearRefreshToken();
    storage.clearUser();
  }
};

