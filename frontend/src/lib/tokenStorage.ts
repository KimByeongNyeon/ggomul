export const setTokens = (accessToken: string) => {
  const storage = localStorage;

  storage.setItem("accessToken", accessToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const updateAccessToken = (accessToken: string) => {
  const storage = localStorage;

  storage.setItem("accessToken", accessToken);
};

export const clearToken = () => {
  localStorage.removeItem("accessToken");
};
