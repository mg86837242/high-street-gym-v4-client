import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useColorModeStore } from '../../context/store';

export default function ColorModeSwitch({ isHome }) {
  const colorMode = useColorModeStore(state => state.colorMode);
  const toggleColorMode = useColorModeStore(state => state.toggleColorMode);

  return isHome ? (
    <button type='button' onClick={toggleColorMode}>
      {colorMode === 'light' ? (
        <FontAwesomeIcon icon={faSun} size='xl' className='text-neutral-content' />
      ) : (
        <FontAwesomeIcon icon={faMoon} size='xl' className='text-neutral-content' />
      )}
    </button>
  ) : (
    <button type='button' onClick={toggleColorMode}>
      {colorMode === 'light' ? <FontAwesomeIcon icon={faSun} size='xl' /> : <FontAwesomeIcon icon={faMoon} size='xl' />}
    </button>
  );
}
