export const localStorageService = {
  getItem: (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }

    return JSON.parse(data);
  },

  setItem: (key: string, data: unknown) => {
    const stringified = JSON.stringify(data);
    localStorage.setItem(key, stringified);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
