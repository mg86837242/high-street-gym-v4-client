import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Btn1 } from '../ui/Btn1';

// This component has the duality of different appearances and behaviors based on the `isHome` props
export default function NavBar({ isHome }) {
  const [navBgClass, setNavBgClass] = useState('flex justify-center fixed top-0 bg-transparent w-full z-20');

  function handleScrollEvent() {
    window.scrollY > document.documentElement.clientHeight
      ? setNavBgClass('flex justify-center fixed top-0 bg-base-300 w-full z-20')
      : setNavBgClass('flex justify-center fixed top-0 bg-transparent w-full z-20');
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
    <div id='nav-bg' className={isHome ? navBgClass : 'sticky top-0 z-20 flex w-full justify-center bg-base-300'}>
      <div id='nav-bar' className='navbar w-full max-w-screen-2xl px-4 2xl:px-4'>
        <NavBarLeft />
        <NavBarCenter />
        <NavBarRight />
      </div>
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
          className='menu-compact menu dropdown-content rounded-box mt-3 w-52 bg-base-300 p-2 shadow'
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
  return (
    <li tabIndex={0}>
      <Link to={to} className='justify-between'>
        {text}
        {hasDropdown && (
          <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
          </svg>
        )}
      </Link>
      {hasDropdown && (
        <ul className='menu rounded-box ml-[-1px] w-56 bg-base-300 p-2'>
          {/* TODO How to use arrow keys to navigate between these submenu buttons, extending to <NavBarCenter> submenu */}
          {children}
        </ul>
      )}
    </li>
  );
}

function NavLeftDropdownCategory({ text }) {
  return (
    <li className='menu-title'>
      <span className='text-sm'>{text}</span>
    </li>
  );
}

function NavLeftDropdownButton({ to, text }) {
  return (
    <li>
      <Link to={to} className='text-sm'>
        {text}
      </Link>
    </li>
  );
}

function NavBarCenter() {
  const auth = useContext(AuthContext);

  return (
    <nav id='nav-center-wrapper' className='navbar-center hidden lg:flex'>
      <ul id='nav-center-menu' className='menu menu-horizontal gap-2 px-1 text-primary-content'>
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
    </nav>
  );
}

function NavCenterButton({ children, to, text, hasDropdown }) {
  return hasDropdown ? (
    <li tabIndex={0}>
      <details>
        <summary>
          <NavLink
            to={to}
            className={({ isActive }) => `${isActive && 'active underline decoration-2 underline-offset-[6px]'}`}
          >
            {text}
          </NavLink>
        </summary>
        <ul className='p-2'>{children}</ul>
      </details>
    </li>
  ) : (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `${isActive && 'active underline decoration-2 underline-offset-[6px]'}`}
      >
        {text}
      </NavLink>
    </li>
  );
}

function NavCenterDropdownCategory({ text }) {
  return <li className='menu-title'>{text}</li>;
}

function NavCenterDropdownButton({ to, text }) {
  return (
    <li>
      <Link to={to}>{text}</Link>
    </li>
  );
}

// TODO Theme switcher: https://daisyui.com/components/swap/
function NavBarRight() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div id='nav-right-wrapper' className='navbar-end flex items-center gap-5'>
      {/* <ThemeSwitch /> */}
      {auth.user ? (
        <>
          <Link
            to='/profile/account'
            className='btn bg-gradient-to-r from-secondary to-primary text-primary-content shadow shadow-black/50'
          >
            Profile
          </Link>
          <Btn1
            onClick={() => {
              auth.handleLogout(() => navigate('/'));
            }}
          >
            Logout
          </Btn1>
        </>
      ) : (
        <>
          <Link
            to='/login'
            state={{ from: location }}
            className='btn bg-gradient-to-r from-secondary to-primary text-primary-content shadow shadow-black/50'
          >
            Login
          </Link>
          <Link
            to='/signup'
            className='btn bg-gradient-to-r from-secondary to-primary text-primary-content shadow shadow-black/50'
          >
            Signup
          </Link>
        </>
      )}
    </div>
  );
}

// References:
// -- https://daisyui.com/docs/colors/#-2
// -- https://daisyui.com/components/navbar/#responsive-dropdown-menu-on-small-screen-center-menu-on-large-screen
// -- https://daisyui.com/components/menu/#menu-with-title
// -- https://codesandbox.io/s/sjsi1?file=/src/App.js:407-581: Exemplar: "On scroll, change sticky menu size and
//  background color"
// -- https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY: Unit of `scrollY` is pixels
// -- https://dev.to/masakudamatsu/don-t-nest-nav-inside-header-do-nest-the-hamburger-menu-button-inside-nav-6cp: TLDR
//  for this project, no need for `<header>`
// -- https://dev.to/luisaugusto/stop-using-fixed-headers-and-start-using-sticky-ones-1k30: The "issue" with fixed
//  element is unironically what is wanted here for the hero image to start at the top of the screen
// -- https://javascript.info/size-and-scroll-window: `document.documentElement.clientHeight`
