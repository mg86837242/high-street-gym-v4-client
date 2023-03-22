import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';

export function ProfilePanel() {
  // FIX Container xl ???
  return (
    <div id='profile-panel-wrapper' className='flex flex-col w-full h-full px-4 py-6 md:flex-row max-w-7xl'>
      <LeftSidePanel />
      <Outlet />
    </div>
  );
}

function LeftSidePanel() {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <div id='profile-sidebar-wrapper' className='flex flex-col gap-5 py-6 pr-6 w-[18.5rem]'>
      <div className='flex items-center justify-between gap-5'>
        <div className='avatar'>
          <div className='rounded-full w-14'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Greetings,</p>
          <p className='text-lg'>{authenticatedUser?.username && authenticatedUser.username}</p>
        </div>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <li>
            <NavLink
              to='account'
              className={({ isActive }) =>
                `btn btn-sm btn-ghost w-full h-full font-normal px-2 py-1.5 flex justify-start items-center gap-2 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faUser} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Edit My Account</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='blog'
              className={({ isActive }) =>
                `btn btn-sm btn-ghost w-full h-full font-normal px-2 py-1.5 flex justify-start items-center gap-2 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faPenToSquare} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Edit My Blogs</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function ProfileAccountPanel() {
  return (
    <div className='flex-grow px-4 py-6'>
      <h1>I'm profile account panel</h1>
      <img src='https://picsum.photos/500/300?random=1' />
    </div>
  );
}

export function ProfileBlogPanel() {
  return (
    <div className='flex-grow px-4 py-6'>
      <h1>I'm profile blog panel</h1>
      <img src='https://picsum.photos/500/300?random=2' />
    </div>
  );
}
