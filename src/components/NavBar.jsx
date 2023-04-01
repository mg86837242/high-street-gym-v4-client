import { useContext, useState, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// This component has the duality of different appearances and behaviors based on the `isHome` props
export default function NavBar({ isHome }) {
  const { authenticatedUser, handleLogout } = useContext(AuthContext);
  const [navBgClass, setNavBgClass] = useState('flex justify-center fixed top-0 bg-transparent w-full z-20');

  function handleScrollEvent() {
    window.scrollY > document.documentElement.clientHeight
      ? setNavBgClass('flex justify-center fixed top-0 bg-neutral/95 w-full z-20')
      : setNavBgClass('flex justify-center fixed top-0 bg-transparent w-full z-20');
  }

  useEffect(() => {
    if (isHome) {
      window.addEventListener('scroll', handleScrollEvent);
      return () => {
        window.removeEventListener('scroll', handleScrollEvent);
      };
    }
  }, [isHome]);

  return (
    <div id='nav-bg' className={isHome ? navBgClass : 'sticky top-0 z-20 flex justify-center bg-neutral/95 w-full'}>
      <div id='nav-bar' className='w-full px-4 navbar max-w-screen-2xl 2xl:px-1'>
        <NavBarLeft user={authenticatedUser} />
        <NavBarCenter user={authenticatedUser} />
        <NavBarRight user={authenticatedUser} handleLogout={handleLogout} />
      </div>
    </div>
  );
}

function NavBarLeft({ user }) {
  return (
    <div id='nav-left-wrapper' className='navbar-start'>
      <div id='nav-left-dropdown-wrapper' className='dropdown'>
        <label id='nav-left-hamburger' tabIndex={0} className='px-1 btn btn-ghost lg:hidden'>
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
          className='p-2 mt-3 shadow menu menu-compact dropdown-content bg-neutral rounded-box w-52'
        >
          {user?.role === 'Admin' ? (
            <>
              <NavLeftButton to={'/'} text={'Home'} />
              <NavLeftButton to={'blogs'} text={'Blogs'} />
              <NavLeftButton to={'bookings'} text={'Bookings'} />
              <NavLeftButton to={'admin/activities'} text={'Admin'} hasDropdown={true}>
                <NavLeftDropdownCategory text={'Manage Records'} />
                <NavLeftDropdownButton to={'admin/activities'} text={'Manage Activities'} />
                <NavLeftDropdownButton to={'admin/blogs'} text={'Manage Blogs'} />
              </NavLeftButton>
            </>
          ) : user?.role === 'Trainer' ? (
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
        className='hidden px-4 text-3xl text-primary font-logo lg:text-4xl lg:px-1 md:flex'
      >
        HS GYM
      </Link>
    </div>
  );
}

function NavLeftButton({ children, to, text, hasDropdown }) {
  return (
    <li id='nav-left-button' tabIndex={0}>
      <Link to={to} className='justify-between'>
        {text}
        {hasDropdown && (
          <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <path d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z' />
          </svg>
        )}
      </Link>
      {hasDropdown && (
        <ul id='nav-center-button-submenu' className='w-56 p-2 ml-1 menu bg-neutral rounded-box'>
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

function NavBarCenter({ user }) {
  return (
    <nav id='nav-center-wrapper' className='hidden navbar-center lg:flex'>
      <ul id='nav-center-menu' className='gap-2 px-1 menu menu-horizontal text-primary-content'>
        {user?.role === 'Admin' ? (
          <>
            <NavCenterButton to={'/'} text={'Home'} />
            <NavCenterButton to={'blogs'} text={'Blogs'} />
            <NavCenterButton to={'bookings'} text={'Bookings'} />
            <NavCenterButton to={'admin/activities'} text={'Admin'} hasDropdown={true}>
              <NavCenterDropdownCategory text={'Manage Records'} />
              <NavCenterDropdownButton to={'admin/activities'} text={'Manage Activities'} />
              <NavCenterDropdownButton to={'admin/blogs'} text={'Manage Blogs'} />
            </NavCenterButton>
          </>
        ) : user?.role === 'Trainer' ? (
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
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `${isActive && 'btn-active underline underline-offset-8 decoration-2'}`}
      >
        {text}
        {hasDropdown && (
          <svg className='fill-current' xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24'>
            <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
          </svg>
        )}
      </NavLink>
      {hasDropdown && (
        <ul id='nav-center-button-submenu' className='w-56 p-2 menu bg-neutral rounded-box'>
          {children}
        </ul>
      )}
    </li>
  );
}

function NavCenterDropdownCategory({ text }) {
  return (
    <li className='menu-title'>
      <span className='text-sm'>{text}</span>
    </li>
  );
}

function NavCenterDropdownButton({ to, text }) {
  return (
    <li>
      <Link to={to} className='text-sm'>
        {text}
      </Link>
    </li>
  );
}

function NavBarRight({ user, handleLogout }) {
  const navigate = useNavigate();

  return (
    <div id='nav-right-wrapper' className='flex items-center gap-5 navbar-end'>
      {/* <ThemeSwitch /> */}
      {user ? (
        <>
          <Link
            to='profile/account'
            className='normal-case shadow btn bg-gradient-to-r from-secondary to-primary shadow-black/50 text-primary-content'
          >
            Profile
          </Link>
          <button
            className='normal-case shadow btn glass bg-base-100 shadow-black/50 text-primary-content'
            onClick={() => {
              handleLogout();
              navigate('/');
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to='login'
            className='normal-case shadow btn bg-gradient-to-r from-secondary to-primary shadow-black/50 text-primary-content'
          >
            Login
          </Link>
          <Link
            to='signup'
            className='normal-case shadow btn bg-gradient-to-r from-secondary to-primary shadow-black/50 text-primary-content'
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
