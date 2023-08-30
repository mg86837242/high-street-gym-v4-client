import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useColorModeStore } from '../../context/store';

export default function ColorModeSwitch({ isHome, homeNavTextClass }) {
  const colorMode = useColorModeStore(state => state.colorMode);
  const toggleColorMode = useColorModeStore(state => state.toggleColorMode);

  return (
    <button type='button' onClick={toggleColorMode}>
      {colorMode === 'light' ? (
        <FontAwesomeIcon icon={faSun} size='xl' className={isHome ? homeNavTextClass : ''} />
      ) : (
        <FontAwesomeIcon icon={faMoon} size='xl' className={isHome ? homeNavTextClass : ''} />
      )}
    </button>
  );
}
