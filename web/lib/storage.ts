const ACCESS_TOKEN_KEY = "trademandu.accessToken";
const REFRESH_TOKEN_KEY = "trademandu.refreshToken";
const USER_KEY = "trademandu.user";
const THEME_KEY = "trademandu.theme";

function safeGet(key: string) {
  return typeof window === "undefined" ? null : localStorage.getItem(key);
}

function safeRemove(key: string) {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
}

export const storage = {
  getAccessToken: () => safeGet(ACCESS_TOKEN_KEY),
  setAccessToken: (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  clearAccessToken: () => {
    safeRemove(ACCESS_TOKEN_KEY);
  },
  getRefreshToken: () => safeGet(REFRESH_TOKEN_KEY),
  setRefreshToken: (token: string) => {
    if (typeof window !== "undefined") localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },
  clearRefreshToken: () => {
    safeRemove(REFRESH_TOKEN_KEY);
  },
  getUser: () => {
    if (typeof window === "undefined") return null;
    const raw = safeGet(USER_KEY);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw);
    } catch {
      safeRemove(USER_KEY);
      safeRemove(ACCESS_TOKEN_KEY);
      safeRemove(REFRESH_TOKEN_KEY);
      return null;
    }
  },
  setUser: (user: unknown) => {
    if (typeof window !== "undefined") localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clearUser: () => {
    safeRemove(USER_KEY);
  },
  getTheme: () => safeGet(THEME_KEY),
  setTheme: (theme: string) => {
    if (typeof window !== "undefined") localStorage.setItem(THEME_KEY, theme);
  },
  clearAll: () => {
    storage.clearAccessToken();
    storage.clearRefreshToken();
    storage.clearUser();
  }
};
