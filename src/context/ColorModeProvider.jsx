import { useColorModeStore } from './store';

export function ColorModeProvider({ children }) {
  const colorMode = useColorModeStore(state => state.colorMode);

  return <div data-theme={colorMode}>{children}</div>;
}
