import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// ??? Current ThemeSwtich solution seems very wonky, and how to make the dot clickable and interactive?
export default function ThemeSwitch() {
  const [dataActClass, setDataActClass] = useState(
    document.documentElement.getAttribute('data-theme') === 'light' ? 'pl-0' : 'pl-4'
  );
  const trackRef = useRef(null);

  useEffect(() => {
    const trackNode = trackRef.current;

    function handleToggle() {
      const themeList = trackNode.getAttribute('data-toggle-theme');
      if (!themeList) {
        return;
      }
      const themeArray = themeList.split(',');
      if (document.documentElement.getAttribute('data-theme') === themeArray[0]) {
        if (themeArray.length === 1) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.removeItem('theme');
        } else {
          document.documentElement.setAttribute('data-theme', themeArray[1]);
          localStorage.setItem('theme', themeArray[1]);
          setDataActClass('pl-4');
        }
      } else {
        document.documentElement.setAttribute('data-theme', themeArray[0]);
        localStorage.setItem('theme', themeArray[0]);
        setDataActClass('pl-0');
      }
    }

    trackNode.addEventListener('click', handleToggle);

    return () => {
      trackNode.removeEventListener('click', handleToggle);
    };
  }, []);

  return (
    <div className={'hidden items-center gap-2' || 'flex items-center gap-2'}>
      <FontAwesomeIcon icon={faSun} tabIndex={0} className='cursor-pointer text-white text-xl' />
      {/* Code snippet for toggle slider: https://codepen.io/saadeghi/pen/OJypbNM */}
      <span
        ref={trackRef}
        data-toggle-theme='light,dark'
        className={`border rounded-full border-white flex items-center cursor-pointer w-10 transition-all duration-300 ease-in-out ${dataActClass}`}
      >
        <span className='rounded-full w-3 h-3 m-1 bg-white'></span>
      </span>
      <FontAwesomeIcon icon={faMoon} tabIndex={0} className='cursor-pointer text-white text-xl' />
    </div>
  );
}

// References:
// -- https://github.com/saadeghi/theme-change/issues/30
// -- https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement: `Document.documentElement` returns the `Element` that is the root element of the `document` (for example, the `<html>` element for HTML documents).
// -- https://react.dev/reference/react/useEffect#connecting-to-an-external-system: `useEffect`: Examples of connecting to an external system #2
