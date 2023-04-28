import { Link } from 'react-router-dom';

// Use case: auth forms
export default function NavBarMinimal() {
  return (
    <div id='nav-bg' className='flex w-full justify-center bg-transparent'>
      <div id='nav-bar' className='navbar w-full max-w-screen-2xl px-4 2xl:px-1'>
        <NavBarLeft />
      </div>
    </div>
  );
}

function NavBarLeft() {
  return (
    <div id='nav-left-wrapper' className='navbar-start'>
      <Link to='/' id='nav-left-logo' className='px-4 font-logo text-3xl text-primary lg:px-1 lg:text-4xl'>
        HS GYM
      </Link>
    </div>
  );
}

// References:
// -- https://daisyui.com/docs/colors/#-2
// -- https://daisyui.com/components/navbar/#responsive-dropdown-menu-on-small-screen-center-menu-on-large-screen
// -- https://daisyui.com/components/menu/#menu-with-title
// -- https://codesandbox.io/s/sjsi1?file=/src/App.js:407-581: Exemplar: "On scroll, change sticky menu size and background color"
// -- https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY: Unit of `scrollY` is pixels
// -- https://dev.to/masakudamatsu/don-t-nest-nav-inside-header-do-nest-the-hamburger-menu-button-inside-nav-6cp: TLDR for this project, no need for `<header>`
// -- https://dev.to/luisaugusto/stop-using-fixed-headers-and-start-using-sticky-ones-1k30: The "issue" with fixed element is unironically what is wanted here for the hero image to start at the top of the screen
// -- https://javascript.info/size-and-scroll-window: `document.documentElement.clientHeight`
