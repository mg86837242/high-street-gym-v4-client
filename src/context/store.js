import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const storedColorMode = window.localStorage.getItem(`${import.meta.env.VITE_APP_NAME}-color-mode`);
const preferredColorMode =
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useColorModeStore = create(
  persist(
    (set, get) => ({
      colorMode: storedColorMode === 'light' || storedColorMode === 'dark' ? storedColorMode : preferredColorMode,
      toggleColorMode: () => set({ colorMode: get().colorMode === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: `${import.meta.env.VITE_APP_NAME}-color-mode`,
    },
  ),
);
