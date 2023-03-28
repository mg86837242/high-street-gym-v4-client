import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import UnderConstruction from '../UnderConstruction';

export function ProfilePanel() {
  return (
    <div
      id='profile-panel-wrapper'
      className='flex flex-col w-full h-full px-4 py-6 md:flex-row max-w-7xl min-h-[calc(100vh-7.5rem)]'
    >
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
          <div className='w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img src='https://picsum.photos/200/200?random=1&grayscale' />
          </div>
        </div>
        <div className='flex flex-col items-end'>
          <p className='text-lg'>Greetings,</p>
          <p className='text-lg text-primary'>{authenticatedUser?.username && authenticatedUser.username}</p>
        </div>
      </div>
      <nav>
        <ul className='flex flex-col'>
          <li>
            <NavLink
              to='account'
              className={({ isActive }) =>
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
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
                `flex items-center justify-start w-full h-full gap-2 px-2 font-normal btn btn-sm btn-ghost py-1.5 ${
                  isActive && 'btn-active'
                }`
              }
            >
              <span>
                <FontAwesomeIcon icon={faPenToSquare} className='w-4 h-4' />
              </span>
              <span className='flex items-center justify-start text-sm'>Edit My Blog Posts</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export function ProfileIndex() {
  return <Navigate to='account' replace />;
}

export function ProfileEditBlog() {
  return <UnderConstruction pageName={'profile edit blog'} />;
}
