import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { Btn } from '../ui/Btn';
import ColorModeSwitch from '../ui/ColorModeSwitch';
import { LinkBtn1 } from '../ui/LinkBtn1';

// This component has the duality of different appearances and behaviors based on the `isHome` props
export default function NavBar({ isHome }) {
  const [homeNavBgClass, setHomeNavBgClass] = useState('flex justify-center fixed top-0 bg-transparent w-full z-20');
  const [homeNavCenterBgClass, setHomeNavCenterBgClass] = useState('bg-transparent');
  const [homeNavCenterDataTheme, setHomeNavCenterDataTheme] = useState('dark');
  const [homeNavTextClass, setHomeNavTextClass] = useState('text-neutral-content');

  function handleScrollEvent() {
    if (window.scrollY > document.documentElement.clientHeight) {
      setHomeNavBgClass('flex justify-center fixed top-0 bg-base-300 w-full z-20');
      setHomeNavCenterBgClass('');
      setHomeNavCenterDataTheme('');
      setHomeNavTextClass('text-base-content');
    } else {
      setHomeNavBgClass('flex justify-center fixed top-0 bg-transparent w-full z-20');
      setHomeNavCenterBgClass('transparent');
      setHomeNavCenterDataTheme('dark');
      setHomeNavTextClass('text-neutral-content');
    }
  }

  useEffect(() => {
    if (!isHome) {
      return;
    }
    window.addEventListener('scroll', handleScrollEvent);
    return () => {
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [isHome]);

  return (
    <div id='nav-bg' className={isHome ? homeNavBgClass : 'sticky top-0 z-20 flex w-full justify-center bg-base-300'}>
      <nav id='nav-bar' className='navbar w-full max-w-screen-2xl px-4 2xl:px-4'>
        <NavBarLeft />
        <NavBarCenter
          isHome={isHome}
          homeNavCenterBgClass={homeNavCenterBgClass}
          homeNavCenterDataTheme={homeNavCenterDataTheme}
        />
        <NavBarRight isHome={isHome} homeNavTextClass={homeNavTextClass} />
      </nav>
    </div>
  );
}

function NavBarLeft() {
  const auth = useContext(AuthContext);

  return (
    <div id='nav-left-wrapper' className='navbar-start'>
      <div id='nav-left-dropdown-wrapper' className='dropdown'>
        <label id='nav-left-hamburger' tabIndex={0} className='btn btn-ghost px-1 lg:hidden'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-9 w-9'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h8m-8 6h16' />
          </svg>
        </label>
        <ul
          id='nav-left-dropdown-menu'
          tabIndex={0}
          className='menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-base-300 p-2 shadow'
        >
          {auth.user?.role === 'Admin' ? (
            <>
              <NavLeftButton to={'/'} text={'Home'} />
              <NavLeftButton to={'blogs'} text={'Blogs'} />
              <NavLeftButton to={'bookings'} text={'Bookings'} />
              <NavLeftButton to={'admin/activities'} text={'Admin'} hasDropdown={true}>
                <NavLeftDropdownCategory text={'Manage Records'} />
                <NavLeftDropdownButton to={'admin/activities'} text={'Manage Activities'} />
                <NavLeftDropdownButton to={'admin/blogs'} text={'Manage Blogs'} />
                <NavLeftDropdownButton to={'admin/members'} text={'Manage Members'} />
              </NavLeftButton>
            </>
          ) : auth.user?.role === 'Trainer' ? (
            <>
              <NavLeftButton to={'/'} text={'Home'} />
              <NavLeftButton to={'blogs'} text={'Blogs'} />
              <NavLeftButton to={'bookings'} text={'Bookings'} />
              <NavLeftButton to={'admin/activities'} text={'Manage'} hasDropdown={true}>
                <NavLeftDropdownCategory text={'Manage Records'} />
                <NavLeftDropdownButton to={'admin/activities'} text={'Manage Activities'} />
              </NavLeftButton>
            </>
          ) : (
            <>
              <NavLeftButton to={'/'} text={'Home'} />
              <NavLeftButton to={'blogs'} text={'Blogs'} />
              <NavLeftButton to={'bookings'} text={'Bookings'} />
            </>
          )}
        </ul>
      </div>
      <Link
        to='/'
        id='nav-left-logo'
        className='hidden px-4 font-logo text-3xl text-primary md:flex lg:px-1 lg:text-4xl'
      >
        HS GYM
      </Link>
    </div>
  );
}

function NavLeftButton({ children, to, text, hasDropdown }) {
  // TODO How to use arrow keys to navigate between these submenu buttons, extending to <NavBarCenter> submenu

  return hasDropdown ? (
    <li>
      <Link to={to}>{text}</Link>
      <ul className='p-2'>{children}</ul>
    </li>
  ) : (
    <li>
      <Link to={to}>{text}</Link>
    </li>
  );
}

function NavLeftDropdownCategory({ text }) {
  return <li className='menu-title'>{text}</li>;
}

function NavLeftDropdownButton({ to, text }) {
  return (
    <li>
      <Link to={to} className=''>
        {text}
      </Link>
    </li>
  );
}

function NavBarCenter({ isHome, homeNavCenterBgClass, homeNavCenterDataTheme }) {
  const auth = useContext(AuthContext);

  return (
    <div
      id='nav-center-wrapper'
      className={`navbar-center hidden bg-transparent lg:flex ${isHome && homeNavCenterBgClass}`}
      data-theme={isHome ? homeNavCenterDataTheme : ''}
    >
      <ul id='nav-center-menu' className='menu menu-horizontal gap-2 px-1'>
        {auth.user?.role === 'Admin' ? (
          <>
            <NavCenterButton to={'/'} text={'Home'} />
            <NavCenterButton to={'blogs'} text={'Blogs'} />
            <NavCenterButton to={'bookings'} text={'Bookings'} />
            <NavCenterButton to={'admin/activities'} text={'Admin'} hasDropdown={true}>
              <NavCenterDropdownCategory text={'Manage Records'} />
              <NavCenterDropdownButton to={'admin/activities'} text={'Manage Activities'} />
              <NavCenterDropdownButton to={'admin/blogs'} text={'Manage Blogs'} />
              <NavCenterDropdownButton to={'admin/members'} text={'Manage Members'} />
            </NavCenterButton>
          </>
        ) : auth.user?.role === 'Trainer' ? (
          <>
            <NavCenterButton to={'/'} text={'Home'} />
            <NavCenterButton to={'blogs'} text={'Blogs'} />
            <NavCenterButton to={'bookings'} text={'Bookings'} />
            <NavCenterButton to={'admin/activities'} text={'Manage'} hasDropdown={true}>
              <NavCenterDropdownCategory text={'Manage Records'} />
              <NavCenterDropdownButton to={'admin/activities'} text={'Manage Activities'} />
            </NavCenterButton>
          </>
        ) : (
          <>
            <NavCenterButton to={'/'} text={'Home'} />
            <NavCenterButton to={'blogs'} text={'Blogs'} />
            <NavCenterButton to={'bookings'} text={'Bookings'} />
          </>
        )}
      </ul>
    </div>
  );
}

function NavCenterButton({ children, to, text, hasDropdown }) {
  return hasDropdown ? (
    <li tabIndex={0}>
      <details>
        <summary>
          <Link to={to}>{text}</Link>
        </summary>
        <ul className='bg-base-300 p-2'>{children}</ul>
      </details>
    </li>
  ) : (
    <li>
      <Link to={to}>{text}</Link>
    </li>
  );
}

function NavCenterDropdownCategory({ text }) {
  return <li className='menu-title'>{text}</li>;
}

function NavCenterDropdownButton({ to, text }) {
  return (
    <li>
      <Link to={to} className='whitespace-nowrap'>
        {text}
      </Link>
    </li>
  );
}

function NavBarRight({ isHome, homeNavTextClass }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div id='nav-right-wrapper' className='navbar-end flex items-center gap-5'>
      <ColorModeSwitch isHome={isHome} homeNavTextClass={homeNavTextClass} />
      {auth.user ? (
        <>
          <LinkBtn1 to='/profile/account'>Profile</LinkBtn1>
          <Btn
            type='button'
            onClick={() => {
              auth.handleLogout(() => navigate('/'));
            }}
          >
            Logout
          </Btn>
        </>
      ) : (
        <>
          <LinkBtn1 to='/login' state={{ from: location }}>
            Login
          </LinkBtn1>
          <LinkBtn1 to='/signup'>Signup</LinkBtn1>
        </>
      )}
    </div>
  );
}

// References:
// -- https://dev.to/masakudamatsu/don-t-nest-nav-inside-header-do-nest-the-hamburger-menu-button-inside-nav-6cp: TLDR
//  for this project, no need for `<header>`
// -- https://codesandbox.io/s/sjsi1?file=/src/App.js:407-581: Exemplar: "On scroll, change sticky menu size and
//  background color"
// -- https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY: Unit of `scrollY` is pixels
// -- https://dev.to/luisaugusto/stop-using-fixed-headers-and-start-using-sticky-ones-1k30: The "issue" with fixed
//  element is unironically what is wanted here for the hero image to start at the top of the screen
// -- https://javascript.info/size-and-scroll-window: `document.documentElement.clientHeight`
